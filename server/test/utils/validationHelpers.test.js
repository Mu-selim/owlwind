import {
  isEmail,
  isStrongPass,
  isEmpty,
} from '../../src/utils/validationHelpers';

describe('Validation Functions', () => {
  describe('isEmail', () => {
    // TODO: Write tests for isEmail
    it('should return true for a valid email', () => {
      expect(isEmail('praxa@mail.com')).toBe(true);
    });
    it('should return true for a valid email', () => {
      expect(isEmail('pra.x.a@mail.com')).toBe(true);
    });
    it('should return true for a valid email', () => {
      expect(isEmail('praxa25@mail.com')).toBe(true);
    });
    it('should return true for a valid email', () => {
      expect(isEmail('praxa@gamil.com')).toBe(true);
    });

    it('should return false for an invalid email', () => {
      expect(isEmail('praxa')).toBe(false);
    });
    it('should return false for an invalid email', () => {
      expect(isEmail('praxa@mail')).toBe(false);
    });
    it('should return false for an invalid email', () => {
      expect(isEmail('praxa@mail.')).toBe(false);
    });
    it('should return false for an invalid email', () => {
      expect(isEmail('praxa@mail.c')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    // TODO: Write tests for isStrongPassword
    it('should return true for a strong password', () => {
      expect(isStrongPass('Pra.x.a25')).toBe(true);
    });
    it('should return true for a strong password', () => {
      expect(isStrongPass('Praxa25@')).toBe(true);
    });

    it('should return false for a weak password', () => {
      expect(isStrongPass('praxa25')).toBe(false);
    });
    it('should return false for a weak password', () => {
      expect(isStrongPass('praxa')).toBe(false);
    });
    it('should return false for a weak password', () => {
      expect(isStrongPass('praxa25@')).toBe(false);
    });
    it('should return false for a weak password', () => {
      expect(isStrongPass('PRAXA25@')).toBe(false);
    });
    it('should return false for a weak password', () => {
      expect(isStrongPass('Praxa')).toBe(false);
    });
  });

  describe('isEmpty', () => {
    // TODO: Write tests for isEmpty
    it('should return true for an empty string', () => {
      expect(isEmpty('')).toBe(true);
    });
    it('should return true for an empty string', () => {
      expect(isEmpty('      ')).toBe(true);
    });

    it('should return false for a non-empty string', () => {
      expect(isEmpty('praxa')).toBe(false);
    });
  });
});
