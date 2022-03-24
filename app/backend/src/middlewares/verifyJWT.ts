import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verifiedToken = verifyToken(token) as JWT.JwtPayload;

    const { id } = verifiedToken;
    req.body.id = id;

    next();
  } catch (err) {
    console.error(err);

    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default verifyJWT;
