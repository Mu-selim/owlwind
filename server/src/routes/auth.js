import { Router } from 'express';
import { postLogin, postLogout, postRegister } from '../controllers/auth.js';
import { isAuthenticated } from '../middlewares/userStatus.js';
import { loginValidate, registerValidate } from '../middlewares/authValidate.js';
export const authRouter = Router();

authRouter.post('/register', isAuthenticated, registerValidate, postRegister);
authRouter.post('/login', isAuthenticated, loginValidate, postLogin);
authRouter.post('/logout', isAuthenticated, postLogout);
authRouter.post('/verify');
