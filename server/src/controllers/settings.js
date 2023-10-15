import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../utils/passwordOpertations.js';

const prisma = new PrismaClient();

const isUserAuth = (authenticationStatus) => {
  if (!authenticationStatus)
    throw new Error('you are not logged in, please login first');
};

const errorHander = (err) => {
  const error = {
    status: 'failed',
    message: err.message,
  };

  if (err.code === 'P2002') {
    error.message = `sorry, this ${err.meta.target} already exists`;
  }

  return error;
};

export const updatePassword = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { oldPassword, newPassword } = req.body;

  try {
    // check if user is authenticated
    isUserAuth(authenticationStatus);

    // check if old password is correct
    const user = await prisma.user.findUnique({
      where: { userID },
      select: { password: true },
    });
    if (!user) throw new Error('sorry, we cannot find your account');
    const isPasswordCorrect = await comparePassword(oldPassword, user.password);
    if (!isPasswordCorrect) throw new Error('old password is incorrect');

    // update password
    const hashedPassword = await hashPassword(newPassword);
    const updatedUser = await prisma.user.update({
      where: { userID },
      data: { password: hashedPassword },
    });
    if (!updatedUser) throw new Error('sorry, something went wrong');

    // send response
    res.status(200).json({
      status: 'success',
      message: 'password updated successfully',
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateEmail = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { email } = req.body;

  try {
    // check if user is authenticated
    isUserAuth(authenticationStatus);

    // update email
    const updatedUser = await prisma.user.update({
      where: { userID },
      data: { email },
    });
    if (!updatedUser) throw new Error('sorry, something went wrong');

    // send response
    res.status(200).json({
      status: 'success',
      message: 'email was updated successfully',
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateUsername = async (req, res) => {
  const { authenticationStatus } = req;
  const userID = req.signedCookies.userID;
  const { username } = req.body;

  try {
    // check if user is authenticated
    isUserAuth(authenticationStatus);

    // update username
    const updatedUser = await prisma.user.update({
      where: { userID },
      data: { username },
    });
    if (!updatedUser) throw new Error('sorry, something went wrong');

    // send response
    res.status(200).json({
      status: 'success',
      message: 'username was updated successfully',
    });
  } catch (err) {
    const error = errorHander(err);
    res.status(400).json(error);
  } finally {
    await prisma.$disconnect();
  }
};
