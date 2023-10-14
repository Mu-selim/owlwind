import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new Error('sorry, user not found');
  return user;
};

const setPrivilege = (isOwner, userData) => {
  isOwner, userData;
};

export const isOwner = async (req, res, next) => {
  const { username } = req.params;
  const userID = req.signedCookies.userID;

  try {
    const currentUser = await getUser(username);

    if (currentUser.userID !== userID)
      req.userPrivilege = setPrivilege(false, currentUser);
    else req.userPrivilege = setPrivilege(true, currentUser);
  } catch (error) {
    return res.status(404).json({
      status: 'failed',
      message: error.message,
      errors: {},
    });
  }
  next();
};
