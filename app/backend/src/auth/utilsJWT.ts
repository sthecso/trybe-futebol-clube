import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { Request, Response, NextFunction } from 'express';

const secret : jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');

const createJwt = (payload: jwt.JwtPayload) => jwt.sign(payload, secret);

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as jwt.JwtPayload;
    const { email } = decoded;
    req.body.user = email;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { createJwt, validateJwt };
