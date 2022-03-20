import { Request, Response, NextFunction } from 'express';
import { verify } from '../../utils/jwt';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ error: 'Invalid token' });
  const authToTest = req.headers.authorization as string;
  verify(authToTest);

  next();
};

export default tokenValidation;
