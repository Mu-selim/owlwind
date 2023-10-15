import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const errorHandler = (err) => {
  const error = {
    status: 'failed',
    message: err.message,
    errors: {},
  };

  if (err.code === 'P2025')
    error.message = 'something went wrong, please try again later';

  return error;
};

const findUser = async (username, userID) => {
  const followedUser = await prisma.user.findUnique({
    where: { username },
  });
  if (!followedUser) throw new Error('sorry, user not found :(');
  if (followedUser.userID === userID)
    throw new Error('you cannot follow or unfollow yourself');

  return followedUser;
};

export const followUser = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { username } = req.params;

  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');

    // Find the user with the given username
    const followedUser = await findUser(username, userID);

    // Check if the user is already following the target user
    const isAlreadyFollowing = await prisma.follow.findFirst({
      where: {
        followerID: userID,
        followingID: followedUser.userID,
      },
    });
    if (isAlreadyFollowing)
      throw new Error('you are already following this user');

    // Create a new follow relationship
    const newFollow = await prisma.follow.create({
      data: {
        followerID: userID,
        followingID: followedUser.userID,
      },
    });
    if (!newFollow) throw new Error('sorry, something went wrong :(');

    res.status(201).json({
      status: 'success',
      message: 'followed successfully',
    });
  } catch (err) {
    res.status(400).json(errorHandler(err));
  } finally {
    await prisma.$disconnect();
  }
};

export const unfollowUser = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { username } = req.params;

  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');

    // Find the user with the given username
    const followedUser = await findUser(username, userID);

    // Check if the user is not currently following the target user
    const followRelationship = await prisma.follow.findFirst({
      where: {
        followerID: userID,
        followingID: followedUser.userID,
      },
    });

    if (!followRelationship) {
      throw new Error('you are not currently following this user');
    }

    // Delete the follow relationship
    await prisma.follow.delete({
      where: {
        id: followRelationship.id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'unfollowed successfully',
    });
  } catch (err) {
    res.status(400).json(errorHandler(err));
  } finally {
    await prisma.$disconnect();
  }
};
