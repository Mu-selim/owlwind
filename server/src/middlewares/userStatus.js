import { verifyToken } from '../utils/tokens.js';

export const isAuthenticated = (req, res, next) => {
  const token = req.signedCookies.userSession;
  if (token && verifyToken(token)) req.authenticationStatus = true;
  else req.authenticationStatus = false;
  next();
};

export const isAuthorized = (req, res, next) => {
  const userID = req.signedCookies.userID;
};
