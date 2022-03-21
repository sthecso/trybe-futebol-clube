import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../jwt';
import StatusCode from '../Enums/statusCode';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Token not found' });

  const jwt = validateToken(token);
  if (!jwt) {
    return res.status(StatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }

  req.body.jwt = jwt;

  next();
};

export default verifyToken;
