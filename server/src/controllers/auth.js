import { PrismaClient } from '@prisma/client';
import { comparePassword, hashPassword } from '../utils/passwordOpertations.js';
import { createToken } from '../utils/tokens.js';
import { cookieOptions } from '../utils/cookie.js';
import { isEmail } from '../utils/validationHelpers.js';

const prisma = new PrismaClient();

const createUser = async (data) => {
  const createdUser = await prisma.user.create({ data });
  if (!createdUser) throw new Error('sorry, something went wrong :(');
  const { password, updatedAt, sortID, ...user } = createdUser;
  return user;
};

export const postRegister = async (req, res) => {
  const { authenticationStatus } = req;
  const { name, username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    // Check authentication status
    if (authenticationStatus)
      throw new Error('you are already logged in, please logout first');

    // Create user
    const user = await createUser({
      name,
      username,
      email,
      password: hashedPassword,
      userURL: `${process.env.CLIENT_URL}/me/${username}`,
    });

    // Create token
    const age = process.env.JWT_EXPIRES_IN;
    const token = createToken(user.userID, age);
    if (!token) throw new Error('sorry, something went wrong :(');

    // Set cookies
    res.cookie('userSession', token, cookieOptions);
    res.cookie('userID', user.userID, cookieOptions);

    // Send response
    const response = {
      status: 'success',
      message: 'user registered successfully',
      data: {
        user,
        posts: [],
      },
    };
    res.status(201).json(response);
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };

    if (err.code === 'P2002') {
      error.message = 'username or email already exists';
      error.errors = { fields: err.meta.target };
    }
    res.status(400).json(error);
  }
};

const getUser = async (userInput) => {
  const field = isEmail(userInput) ? 'email' : 'username';
  const user = await prisma.user.findUnique({
    where:
      field === 'username' ? { username: userInput } : { email: userInput },
  });
  if (!user) throw new Error(`sorry, no user found with this ${field}`);
  return user;
};

const checkPassword = async (password, hashedPassword, userInput) => {
  const field = isEmail(userInput) ? 'email' : 'username';
  const isMatch = await comparePassword(password, hashedPassword);

  if (!isMatch) {
    throw new Error(
      field === 'username'
        ? 'invalid username or password'
        : 'invalid email or password'
    );
  }
};

const getPostsFromFollowedUsers = async (userID) => {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        followers: { some: { followerID: userID } },
      },
    },
    include: { user: true, comments: true, reactions: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts;
};

export const postLogin = async (req, res) => {
  const { authenticationStatus } = req;
  const { user: userInput, password: sentPassword } = req.body;

  try {
    // Check authentication status
    if (authenticationStatus)
      throw new Error('you are already logged in, please logout first');

    // Find user
    const data = await getUser(userInput);

    // Check password
    await checkPassword(sentPassword, data.password, userInput);

    // Get posts from followed users
    const posts = await getPostsFromFollowedUsers(data.userID);

    // Create token
    const age = process.env.JWT_EXPIRES_IN;
    const token = createToken(data.userID, age);
    if (!token) throw new Error('sorry, something went wrong :(');

    // Set cookies
    res.cookie('userSession', token, cookieOptions);
    res.cookie('userID', data.userID, cookieOptions);

    // Send response
    const { password, updatedAt, sortID, ...user } = data;
    const response = {
      status: 'success',
      message: 'user logged in successfully',
      data: {
        user,
        posts,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    const error = {
      status: 'failed',
      message: err.message,
      errors: {},
    };
    res.status(400).json(error);
  }
};

export const postLogout = async (req, res) => {
  const { authenticationStatus } = req;
  if (!authenticationStatus) {
    return res.status(401).json({
      status: 'failed',
      message: 'you are not logged in, please login first',
    });
  }

  res.clearCookie('userSession');
  res.clearCookie('userID');
  res.status(200).json({
    status: 'success',
    message: 'user logged out successfully',
  });
};
