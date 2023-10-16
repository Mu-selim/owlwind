import { Router } from 'express';
import { isAuthenticated } from '../middlewares/userStatus.js';
import {
  addReaction,
  getPostReactions,
  removeReaction,
} from '../controllers/reaction.js';

export const reactionRouter = Router();

reactionRouter.post('/', isAuthenticated, addReaction);
reactionRouter.get('/:postID', getPostReactions);
reactionRouter.delete('/', isAuthenticated, removeReaction);
