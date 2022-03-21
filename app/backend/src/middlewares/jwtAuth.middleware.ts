import { NextFunction, Request, Response } from 'express';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const SECRET = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

    const { id, email, role, username } = jwt.verify(token, SECRET) as jwt.JwtPayload;

    req.tokenData = { id, email, role, username };
    return next();
  } catch (e: unknown) {
    if (e instanceof Error && e.name.includes('Token')) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    return next(e);
  }
};
