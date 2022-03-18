import { Request, Response, NextFunction } from 'express';

import { validateToken } from '../jwt';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  const jwtData = validateToken(token);
  if (!jwtData) return res.status(401).json({ message: 'Expired or invalid token' });

  req.body.jwtData = jwtData;

  next();
};

export default verifyToken;
