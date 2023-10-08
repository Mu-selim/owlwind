import { Router } from 'express';
export const authRouter = Router();

authRouter.post('/login');
authRouter.post('/register');
authRouter.post('/logout');
authRouter.get('/verify');
