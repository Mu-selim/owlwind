import { verifyToken } from '../utils/tokens.js';

const authenticatedMessage = 'you are already logged in, please logout first';
const authorizedMessage = 'you are not logged in, please login first';

export const isAuthenticated = (req, res, next) => {
  const token = req.signedCookies.userSession;
  if (token && verifyToken(token)) req.authenticationStatus = true;
  else req.authenticationStatus = false;
  next();
};

export const isAuthorized = (req, res, next) => {
  const userID = req.signedCookies.userID;
};
