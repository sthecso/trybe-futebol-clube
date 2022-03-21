import { NextFunction, Response, Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import tokenValidation from '../joi/token';
import { jwt } from '../../utils';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  tokenValidation({ authorization }, res);
  try {
    const decoded = jwt.verifyToken(authorization as string);
    req.id = decoded;
    next();
  } catch (e) {
    console.log(e);
    console.log(JsonWebTokenError);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
