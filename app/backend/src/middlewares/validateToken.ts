import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validate = jwt.verify(authorization);
    if (!validate) {
      return res.status(401).json({ nessage: 'Token expired or invalid' });
    }
    req.body.validate = validate;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};

export default validateToken;
