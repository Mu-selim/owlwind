import { Router } from 'express';
import { postRegister } from '../controllers/auth.js';
import { isAuthenticated } from '../middlewares/userStatus.js';
import { registerValidate } from '../middlewares/authValidate.js';
export const authRouter = Router();

authRouter.post('/register', isAuthenticated, registerValidate, postRegister);
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/verify');
