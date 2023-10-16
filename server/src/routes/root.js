import { Router } from 'express';
import { isAuthenticated } from '../middlewares/userStatus.js';
import { getFeeds } from '../controllers/root.js';

export const rootRouter = Router();

rootRouter.get('/', isAuthenticated, getFeeds);
