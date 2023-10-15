import { isEmail, isEmpty, isStrongPass } from '../utils/validationHelpers.js';

export const passwordValidate = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const errors = {};

  if (isEmpty(oldPassword) || !oldPassword)
    errors.oldPassword = 'old password cannot be empty';
  if (isEmpty(newPassword) || !newPassword)
    errors.newPassword = 'new password cannot be empty';
  if (oldPassword === newPassword && !isEmpty(oldPassword))
    errors.newPassword = 'new password cannot be the same as old password';
  else if (newPassword && !isStrongPass(newPassword)) {
    errors.newPassword =
      'new password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol';
  }

  if (Object.keys(errors).length > 0) {
    const error = {
      status: 'failed',
      message: 'input validation failed, please check your inputs',
      errors,
    };
    return res.status(400).json(error);
  }
  next();
};

export const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const errors = {};

  if (isEmpty(email) || !email) errors.email = 'email cannot be empty';
  else if (!isEmail(email)) errors.email = 'invalid email address';

  if (Object.keys(errors).length > 0) {
    const error = {
      status: 'failed',
      message: 'input validation failed, please check your inputs',
      errors,
    };
    return res.status(400).json(error);
  }
  next();
};

export const usernameValidate = (req, res, next) => {
  const { username } = req.body;
  const errors = {};

  if (isEmpty(username) || !username)
    errors.username = 'username cannot be empty';
  else if (username.length < 3)
    errors.username = 'username must be at least 3 characters long';
  else if (username.length > 50)
    errors.username = 'username cannot be longer than 50 characters';

  if (Object.keys(errors).length > 0) {
    const error = {
      status: 'failed',
      message: 'input validation failed, please check your inputs',
      errors,
    };
    return res.status(400).json(error);
  }
  next();
};
