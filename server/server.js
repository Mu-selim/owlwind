import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// application routes
import { rootRouter } from './src/routes/root.js';
import { authRouter } from './src/routes/auth.js';
import { profileRouter } from './src/routes/profile.js';
import { postRouter } from './src/routes/post.js';
import { settingsRouter } from './src/routes/settings.js';
import { reactionRouter } from './src/routes/reaction.js';

const app = express();
dotenv.config();

const corsOptions = {
  origin: function (origin, callback) {
    // Allow any origin to access your server
    callback(null, true);
  },
  credentials: true, // Allow credentials (cookies) to be included
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));

// routes
app.use('/', rootRouter);
app.use('/auth/', authRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter);
app.use('/settings', settingsRouter);
app.use('/react', reactionRouter);
// app.use('/comment');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
