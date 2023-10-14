import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { getUserByUsername } from '../../utils/getUser.js';

const prisma = new PrismaClient();
const SERVER_URL = process.env.SERVER_URL;

const checkUser = async (authenticationStatus, username, userID) => {
  if (!authenticationStatus)
    throw new Error('sorry, you are not logged in, please log in first');

  const user = await getUserByUsername(username);
  if (!user) throw new Error('sorry, this user does not exist');

  if (user.userID !== userID)
    throw new Error('sorry, you are not allowed to edit this profile');
};

const updateProfileInfo = async (username, name, about, location) => {
  const updatedUser = await prisma.user.update({
    where: { username },
    data: { name, about, location },
  });
  if (!updatedUser) throw new Error('sorry, something went wrong');
};

export const putProfileInfo = async (req, res) => {
  const { authenticationStatus } = req;
  const { name, about, location } = req.body;
  const { username } = req.params;
  const userID = req.signedCookies.userID;

  try {
    await checkUser(authenticationStatus, username, userID);
    await updateProfileInfo(username, name, about, location);

    return res.status(200).json({
      status: 'success',
      message: 'user profile updated successfully',
    });
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };
    return res.status(400).json(error);
  }
};

const fileName = (req, file, cb) => {
  // save file as timestamp + random number + file extension
  cb(
    null,
    `${Date.now()}-${Math.round(Math.random() * 1e9)}.${
      file.mimetype.split('/')[1]
    }`
  );
};

const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profilePicture');
  },
  filename: fileName,
});

const updateProfilePicture = multer({ storage: profilePictureStorage }).single(
  'profilePicture'
);

export const putProfilePicture = async (req, res) => {
  const { authenticationStatus } = req;
  const { username } = req.params;
  const userID = req.signedCookies.userID;
  try {
    await checkUser(authenticationStatus, username, userID);

    updateProfilePicture(req, res, async (err) => {
      if (err) throw new Error('sorry, something went wrong');

      const updatedUser = await prisma.user.update({
        where: { username },
        data: {
          avatarURL: `${SERVER_URL}/profilePicture/${req.file.filename}`,
        },
      });
      if (!updatedUser) throw new Error('sorry, something went wrong');

      res.status(200).json({
        status: 'success',
        message: 'user profile picture updated successfully',
      });
    });
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };
    res.status(400).json(error);
  }
};

const profileBannerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profileBanner');
  },
  filename: fileName,
});

const updateprofileBanner = multer({ storage: profileBannerStorage }).single(
  'profileBanner'
);

export const putProfileBanner = async (req, res) => {
  const { authenticationStatus } = req;
  const { username } = req.params;
  const userID = req.signedCookies.userID;
  try {
    await checkUser(authenticationStatus, username, userID);

    updateprofileBanner(req, res, async (err) => {
      if (err) throw new Error('sorry, something went wrong');

      const updatedUser = await prisma.user.update({
        where: { username },
        data: { bannerURL: `${SERVER_URL}/profileBanner/${req.file.filename}` },
      });

      if (!updatedUser) throw new Error('sorry, something went wrong');

      res.status(200).json({
        status: 'success',
        message: 'user profile banner updated successfully',
      });
    });
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };
    res.status(400).json(error);
  }
};
