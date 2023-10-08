import jwt from 'jsonwebtoken';

export const createToken = (id, maxAge) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return false;
    } else {
      return decodedToken;
    }
  });
};
