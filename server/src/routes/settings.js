import { Router } from 'express';
import { isAuthenticated } from '../middlewares/userStatus.js';
import {
  updateEmail,
  updatePassword,
  updateUsername,
} from '../controllers/settings.js';
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from '../middlewares/settingsValidate.js';

export const settingsRouter = Router();

settingsRouter.put(
  '/password',
  isAuthenticated,
  passwordValidate,
  updatePassword
);
settingsRouter.put('/email', isAuthenticated, emailValidate, updateEmail);
settingsRouter.put(
  '/username',
  isAuthenticated,
  usernameValidate,
  updateUsername
);
