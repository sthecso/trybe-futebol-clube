import { Request, Response, NextFunction } from 'express';

import { validateToken } from '../src/jwt';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  const user = validateToken(token);
  if (!user) return res.status(401).json({ message: 'Expired or invalid token' });

  req.user = user;

  next();
};

export default {
  verifyToken,
};
