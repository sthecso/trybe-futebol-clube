import { RequestHandler } from 'express';
import throwError from '../../service/error';

const emailValidation: RequestHandler = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return throwError('All fields must be filled', '401');

  next();
};

const passwordValidation: RequestHandler = (req, _res, next) => {
  const { password } = req.body;
  if (password.length < 7) return throwError('Password must be longer than 6 characters', '401');

  next();
};

export default [
  emailValidation,
  passwordValidation,
];
