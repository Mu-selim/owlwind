import bcrypt from 'bcrypt';
import {
  hashPassword,
  comparePassword,
} from '../../src/utils/passwordOpertations.js'; // Replace with the actual path to your authentication module

describe('Authentication Functions', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'myPassword123';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).not.toBe(password); // The hashed password should not be the same as the original password
      expect(hashedPassword).toHaveLength(60); // Bcrypt hashed passwords are typically 60 characters long
    });
  });

  describe('comparePassword', () => {
    it('should return true for a valid password', async () => {
      const password = 'myPassword123';
      const hashedPassword = await bcrypt.hash(password, 10); // Generate a hash for the password
      const isValid = await comparePassword(password, hashedPassword);

      expect(isValid).toBe(true);
    });

    it('should return false for an invalid password', async () => {
      const validPassword = 'myPassword123';
      const invalidPassword = 'wrongPassword';
      const hashedPassword = await bcrypt.hash(validPassword, 10); // Generate a hash for the valid password
      const isValid = await comparePassword(invalidPassword, hashedPassword);

      expect(isValid).toBe(false);
    });
  });
});
