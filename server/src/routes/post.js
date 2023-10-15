import { Router } from 'express';
import { createPost, deletePost, getPost } from '../controllers/post.js';
import { isAuthenticated } from '../middlewares/userStatus.js';

export const postRouter = Router();

postRouter.post('/create', isAuthenticated, createPost);
postRouter.get('/:postID', getPost);
postRouter.delete('/:postID', isAuthenticated, deletePost);
