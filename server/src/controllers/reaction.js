import { PrismaClient } from '@prisma/client';
import { isEmpty } from '../utils/validationHelpers.js';

const prisma = new PrismaClient();

const errorHander = (err) => {
  return {
    status: 'failed',
    message: err.message,
  };
};

const findPost = async (postID) => {
  const post = await prisma.post.findUnique({
    where: { postID },
  });
  if (!post) throw new Error('sorry, we cannot find the post');
};

export const addReaction = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { postID } = req.body;

  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');

    if (!postID || isEmpty(postID))
      throw new Error('something went wrong, please try again later');

    // check if the post with the given `postID` exists
    await findPost(postID);

    // check if the user has already liked the post
    const existingReaction = await prisma.reaction.findFirst({
      where: { userID, postID },
    });
    if (existingReaction) throw new Error('you have already liked the post');

    // create a new reaction to the post
    const newReaction = await prisma.reaction.create({
      data: { userID, postID },
    });

    // send response
    res.status(200).json({
      status: 'success',
      message: 'post liked successfully',
      data: newReaction,
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getPostReactions = async (req, res) => {
  const { postID } = req.params;

  try {
    if (!postID || isEmpty(postID))
      throw new Error('postID cannot be empty or missing');

    // check if the post with the given `postID` exists
    await findPost(postID);

    // get all the reactions to the post and [name, username, userID, avatarURL] details of the users who reacted
    const reactions = await prisma.reaction.findMany({
      where: { postID },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            userID: true,
            avatarURL: true,
          },
        },
      },
    });

    // send response
    res.status(200).json({
      status: 'success',
      message: 'post reactions fetched successfully',
      data: reactions,
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const removeReaction = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { postID } = req.body;

  try {
    if (!authenticationStatus)
      throw new Error('you are not logged in, please login first');

    if (!postID || isEmpty(postID))
      throw new Error('postID cannot be empty or missing');

    // check if the post with the given `postID` exists
    await findPost(postID);

    // check if the user has already liked the post
    const existingReaction = await prisma.reaction.findFirst({
      where: { userID, postID },
    });
    if (!existingReaction) throw new Error('you have not liked the post');

    // delete the reaction
    const deletedReaction = await prisma.reaction.delete({
      where: { id: existingReaction.id },
    });

    // send response
    res.status(200).json({
      status: 'success',
      message: 'post unliked successfully',
      data: deletedReaction,
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};
