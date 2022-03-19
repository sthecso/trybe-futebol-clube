import 'express-async-errors';
import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verify } from '../utils/jwt';
import { request } from '../utils/messages';
import StatusCodes from '../utils/StatusCodes';

const auth: RequestHandler = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: request.token.notFound });
  }

  try {
    const userData = verify(token) as JwtPayload;

    req.body.user = userData;
  } catch (err) {
    console.error(err);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: request.token.invalid });
  }

  next();
};

export default auth;