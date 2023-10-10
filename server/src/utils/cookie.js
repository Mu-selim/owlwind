const age = process.env.JWT_EXPIRES_IN;

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  signed: true,
  secure: true,
  maxAge: age * 1000,
};
