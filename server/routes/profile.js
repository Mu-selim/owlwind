import { Router } from 'express';
export const profileRouter = Router();

// TODO: Add route for getting a user's profile
profileRouter.get('/:username');

// TODO: Add routes for following and unfollowing a user
profileRouter.post('/:username/follow');
profileRouter.delete('/:username/follow');

// TODO: Add route for editing a user's profile information, profile picture, banner, etc.
profileRouter.put('/:username/info');
profileRouter.put('/:username/picture');
profileRouter.put('/:username/banner');