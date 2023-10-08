import validator from 'validator';

export const isEmail = (email) => {
  return validator.isEmail(email);
};

export const isStrongPass = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};

export const isEmpty = (string) => {
  if (typeof string !== 'string') return false;
  return validator.isEmpty(string.trim());
};
