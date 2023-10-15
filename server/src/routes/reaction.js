import { Router } from 'express';
import { isAuthenticated } from '../middlewares/userStatus.js';
import { addReaction, removeReaction } from '../controllers/reaction.js';

export const reactionRouter = Router();

reactionRouter.post('/', isAuthenticated, addReaction);
reactionRouter.delete('/', isAuthenticated, removeReaction);
