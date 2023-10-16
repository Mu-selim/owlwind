import { PrismaClient } from '@prisma/client';
import { isEmpty } from '../utils/validationHelpers.js';

const prisma = new PrismaClient();

const errorHander = (err) => {
  const error = {
    status: 'failed',
    message: err.message,
  };

  if (err.code === 'P2002')
    error.message = 'something went wrong, please try again later';

  return error;
};

const checkHelper = (authenticationStatus, postID, contentOrCommentID) => {
  if (!authenticationStatus)
    throw new Error('you are not logged in, please login first');

  if (!postID || isEmpty(postID))
    throw new Error('something went wrong, please try again');

  if (!contentOrCommentID || isEmpty(contentOrCommentID))
    throw new Error('something went wrong, please try again');
};

const findPost = async (postID) => {
  const post = await prisma.post.findUnique({
    where: { postID },
  });
  if (!post) throw new Error('sorry, we cannot find the post');
};

export const addComment = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { postID, content } = req.body;

  try {
    // check if the user is logged in and the `postID` and `content` are not empty
    checkHelper(authenticationStatus, postID, content);

    // check if the post with the given `postID` exists
    await findPost(postID);

    // create a new comment
    const newComment = await prisma.comment.create({
      data: { userID, postID, content },
      include: {
        user: {
          select: {
            userID: true,
            username: true,
            avatarURL: true,
            name: true,
          },
        },
      },
    });
    if (!newComment) throw new Error('sorry, something went wrong');

    // send response
    res.status(201).json({
      status: 'success',
      message: 'comment added successfully',
      data: newComment,
    });
  } catch (err) {
    console.log(err);
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getPostComments = async (req, res) => {
  const { postID } = req.params;

  try {
    if (!postID || isEmpty(postID))
      throw new Error('postID cannot be empty or missing');

    // check if the post with the given `postID` exists
    await findPost(postID);

    // get all comments of the post
    const comments = await prisma.comment.findMany({
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
      },
    });

    // send response
    res.status(200).json({
      status: 'success',
      message: 'comments fetched successfully',
      data: comments,
    });
  } catch (err) {
    console.log(err);
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const removeComment = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { postID, commentID } = req.body;

  try {
    // check if the user is logged in and the `postID` and `commentID` are not empty
    checkHelper(authenticationStatus, postID, commentID);

    // check if the post with the given `postID` exists
    await findPost(postID);

    // check if the comment with the given `commentID` exists
    const comment = await prisma.comment.findUnique({
      where: { commentID },
    });
    if (!comment) throw new Error('sorry, comment not found');

    // check if the user is the owner of the comment
    if (comment.userID !== userID)
      throw new Error('sorry, you are not the owner of the comment');

    // delete the comment
    const deletedComment = await prisma.comment.delete({
      where: { commentID },
    });
    if (!deletedComment) throw new Error('sorry, something went wrong');

    // send response
    res.status(200).json({
      status: 'success',
      message: 'comment deleted successfully',
      data: deletedComment,
    });
  } catch (err) {
    console.log(err);
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};
