import { Request, Response, NextFunction } from 'express';

import { validateToken } from '../src/jwt';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  const userId = validateToken(token);
  if (!userId) return res.status(401).json({ message: 'Expired or invalid token' });

  req.body.userId = userId;

  next();
};

export default {
  verifyToken,
};
