import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { Request, Response, NextFunction } from 'express';

const secret : jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');

const createJwt = (payload: string) => jwt.sign(payload, secret);

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { createJwt, validateJwt };
