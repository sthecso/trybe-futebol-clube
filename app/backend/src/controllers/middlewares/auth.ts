import { NextFunction, Response } from 'express';
import jwt = require('jsonwebtoken');
import myJwt from '../../utils/jwt';
import IRequest from '../../interfaces/IRequest';

const auth = async (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const user = myJwt.jwtVerify(token) as jwt.JwtPayload;

    req.user = { ...user };
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  return next();
};

export default auth;
