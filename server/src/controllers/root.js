import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ifUserNotAuth = async () => {
  const posts = await prisma.post.findMany({
    take: 35,
    include: {
      reactions: true,
      comments: true,
      user: { select: { name: true, username: true, avatarURL: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return {
    user: null,
    posts,
  };
};

const ifUserAuth = async (userID) => {
  if (!userID) return await ifUserNotAuth();

  // Find the current user
  const data = await prisma.user.findUnique({
    where: { userID },
  });
  if (!data) return await ifUserNotAuth();

  // Find all users that the current user is following
  const followedUsers = await prisma.follow.findMany({
    where: { followerID: userID },
    select: { followingID: true },
  });

  // Extract the IDs of the followed users
  const followedUserIDs = followedUsers.map((follow) => follow.followingID);

  // Find posts of the followed users and sort them by createdAt in descending order
  const postsOfFollowedUsers = await prisma.post.findMany({
    where: { userID: { in: followedUserIDs } },
    include: {
      reactions: true,
      comments: true,
      user: {
        select: { name: true, username: true, avatarURL: true, userID: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const { password, updatedAt, sortID, ...user } = data;
  return {
    user,
    posts: postsOfFollowedUsers,
  };
};

export const getFeeds = async (req, res) => {
  const { authenticationStatus } = req;

  try {
    if (authenticationStatus) {
      const data = await ifUserAuth(req.signedCookies.userID);
      return res.status(200).json({
        status: 'success',
        message: 'user is authenticated',
        data,
      });
    } else {
      const data = await ifUserNotAuth();
      return res.status(200).json({
        status: 'success',
        message: 'user is not authenticated',
        data,
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};
