import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/passwordOpertations.js';
import { createToken } from '../utils/tokens.js';
import { cookieOptions } from '../utils/cookie.js';
const prisma = new PrismaClient();

const createUser = async (data) => {
  const createdUser = await prisma.user.create({ data });
  if (!createdUser) throw new Error('sorry, something went wrong :(');
  const { password, createdAt, updatedAt, sortID, ...user } = createdUser;
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
