import { Router } from 'express';
import { getProfile } from '../controllers/profile/profile.js';
import { isAuthenticated } from '../middlewares/userStatus.js';
import {
  putProfileBanner,
  putProfileInfo,
  putProfilePicture,
} from '../controllers/profile/profileInfo.js';
import { userInfoValidate } from '../middlewares/infoValidate.js';
import { followUser, unfollowUser } from '../controllers/profile/profileFollowUnfollow.js';

export const profileRouter = Router();

// TODO: Add route for getting a user's profile
profileRouter.get('/:username', getProfile);

// TODO: Add routes for following and unfollowing a user
profileRouter.post('/:username/follow', isAuthenticated, followUser);
profileRouter.delete('/:username/follow', isAuthenticated, unfollowUser);

// TODO: Add route for editing a user's profile information, profile picture, banner, etc.
profileRouter.put('/:username/info', isAuthenticated, userInfoValidate, putProfileInfo);
profileRouter.put('/:username/picture', isAuthenticated, putProfilePicture);
profileRouter.put('/:username/banner', isAuthenticated, putProfileBanner);
