import { Request, Response, NextFunction } from 'express';
import { Jwt } from '../utils';

// Source: https://stackoverflow.com/a/55718334
declare module 'express-serve-static-core' {
  interface Request {
    userRole?: string
  }
}
export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const jwt = new Jwt();

  const { role } = jwt.verifyToken(authorization);

  req.userRole = role;

  return next();
};
