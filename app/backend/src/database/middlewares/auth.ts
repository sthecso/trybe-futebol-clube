import { RequestHandler } from 'express';
import rescue from 'express-rescue';
import { StatusCodes } from 'http-status-codes';
import { verify } from '../utils/jwt';
import request from '../utils/messages';

const auth: RequestHandler = rescue(async (req, res, next) => {
  const token: string = req.headers.authorization || '';

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: request.token.notFound });
  }

  try {
    verify(token);
  } catch (err) {
    console.error(err);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: request.token.invalid });
  }

  next();
});

export default auth;
