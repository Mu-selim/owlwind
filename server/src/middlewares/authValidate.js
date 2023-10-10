import { isEmail, isEmpty, isStrongPass } from '../utils/validationHelpers.js';

export const registerValidate = (req, res, next) => {
  const { name, username, email, password } = req.body;
  const errors = {};

  if (isEmpty(name)) errors.name = 'name cannot be empty';
  if (isEmpty(username)) errors.username = 'username cannot be empty';
  else if (username.length < 3)
    errors.username = 'username must be at least 3 characters long';
  else if (username.length > 50)
    errors.username = 'username must be at most 30 characters long';
  if (isEmpty(email)) errors.email = 'email cannot be empty';
  else if (!isEmail(email)) errors.email = 'invalid email address';
  if (isEmpty(password)) errors.password = 'password cannot be empty';
  else if (!isStrongPass(password))
    errors.password =
      'password must be at least 8 characters long, and must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol';

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

export const loginValidate = (req, res, next) => {
  const { user, password } = req.body;
  const errors = {};

  if (isEmpty(user)) errors.user = 'username or email cannot be empty';
  if (isEmpty(password)) errors.password = 'password cannot be empty';

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
