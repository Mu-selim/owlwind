import { PrismaClient } from '@prisma/client';
import { isEmpty } from '../utils/validationHelpers.js';

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

export const createPost = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { content } = req.body;
  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');
    if (isEmpty(content)) throw new Error('content cannot be empty');

    const createdPost = await prisma.post.create({
      data: {
        content,
        postURL: `${userID}/${Date.now()}`,
        user: { connect: { userID } },
      },
    });
    if (!createdPost) throw new Error('sorry, something went wrong');

    res.status(201).json({
      status: 'success',
      message: 'post created successfully',
      data: {
        post: createdPost,
      },
    });
  } catch (err) {
    res.status(400).json(errorHandler(err));
  }
};

export const getPost = async (req, res) => {
  const { postID } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { postID },
      include: {
        user: {
          select: {
            userID: true,
            username: true,
            avatarURL: true,
            name: true,
          },
        },
        comments: true,
        reactions: true,
      },
    });
    if (!post) throw new Error('sorry, post not found :(');

    res.status(200).json({
      status: 'success',
      message: 'post found successfully',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json(errorHandler(err));
  }
};

export const deletePost = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { postID } = req.params;

  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');

    const deletedPost = await prisma.post.delete({
      where: { postID, userID },
    });
    if (!deletedPost) throw new Error('sorry, something went wrong');

    res.status(200).json({
      status: 'success',
      message: 'post deleted successfully',
      data: {
        post: deletedPost,
      },
    });
  } catch (err) {
    res.status(400).json(errorHandler(err));
  }
};
