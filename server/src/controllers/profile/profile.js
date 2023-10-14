import { PrismaClient } from '@prisma/client';
import { getUserByUsername } from '../../utils/getUser.js';

const prisma = new PrismaClient();

const getUserPosts = async (username) => {
  const posts = await prisma.post.findMany({
    where: { user: { username } },
    include: { reactions: true, comments: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts;
};

export const getProfile = async (req, res) => {
  const { username } = req.params;
  const userID = req.signedCookies.userID;

  try {
    const user = await getUserByUsername(username);
    if (!user) throw new Error('sorry, this user does not exist');

    const posts = await getUserPosts(username);

    return res.status(200).json({
      status: 'success',
      message: 'user profile retrieved successfully',
      privilege: user.userID === userID ? 'owner' : 'viewer',
      data: { user, posts },
    });
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };
    res.status(404).json(error);
  }
};
