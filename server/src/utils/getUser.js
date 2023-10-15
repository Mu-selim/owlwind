import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) throw new Error('sorry, user not found :(');
  const { password, updatedAt, sortID, ...returnedUser } = user;
  return returnedUser;
};
