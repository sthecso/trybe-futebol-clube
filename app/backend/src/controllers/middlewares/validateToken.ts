import * as express from 'express';
import { verifyToken } from '../../utils/tokenHelper';

const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    verifyToken(token);
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next();
};
export default validateToken;
