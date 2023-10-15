import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../utils/tokens.js';

const prisma = new PrismaClient();

export const isAuthenticated = (req, res, next) => {
  const token = req.signedCookies.userSession;
  if (token && verifyToken(token)) req.authenticationStatus = true;
  else req.authenticationStatus = false;
  next();
};
