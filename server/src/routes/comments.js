import { Router } from 'express';
import { isAuthenticated } from '../middlewares/userStatus.js';
import {
  addComment,
  getPostComments,
  removeComment,
} from '../controllers/comments.js';

export const commentsRouter = Router();

commentsRouter.post('/', isAuthenticated, addComment);
commentsRouter.get('/:postID', getPostComments);
commentsRouter.delete('/', isAuthenticated, removeComment);
