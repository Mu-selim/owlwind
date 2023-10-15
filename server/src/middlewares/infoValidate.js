import { isEmpty } from "../utils/validationHelpers.js";

export const userInfoValidate = (req, res, next) => {
  const { name, about, location } = req.body;
  const errors = {};

  if (isEmpty(name)) errors.name = 'name cannot be empty';
  else if (name.length > 50)
    errors.name = 'name must be at most 50 characters long';
  if (isEmpty(about)) errors.about = 'about cannot be empty';
  else if (about.length > 160)
    errors.about = 'about must be at most 160 characters long';
  if (isEmpty(location)) errors.location = 'location cannot be empty';

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
