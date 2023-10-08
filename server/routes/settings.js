import { Router } from 'express';
export const settingsRouter = Router();

settingsRouter.put('/password');
settingsRouter.put('/email');
settingsRouter.put('/username');