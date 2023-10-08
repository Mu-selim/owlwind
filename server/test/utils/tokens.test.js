import jwt from 'jsonwebtoken';
import { createToken, verifyToken } from '../../src/utils/tokens.js';

describe('Authentication Functions', () => {
  const secretKey = process.env.JWT_SECRET;

  describe('createToken', () => {
    it('should create a valid JWT token', () => {
      const userId = '123456';
      const maxAge = '1h'; // Set the maximum age of the token to 1 hour
      const token = createToken(userId, maxAge);
      const decodedToken = jwt.verify(token, secretKey);

      expect(decodedToken.id).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', () => {
      const userId = '123456';
      const maxAge = '1h'; // Set the maximum age of the token to 1 hour
      const token = createToken(userId, maxAge);
      const decodedToken = verifyToken(token);

      expect(decodedToken).toBeTruthy();
      expect(decodedToken.id).toBe(userId);
    });

    it('should return false for an invalid JWT token', () => {
      const invalidToken = 'invalid-token';
      const decodedToken = verifyToken(invalidToken);

      expect(decodedToken).toBe(false);
    });
  });
});
