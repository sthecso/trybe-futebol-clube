import { Request, Response, NextFunction } from 'express';
import * as service from '../services/login';

export const login = (req: Request, res: Response, next: NextFunction) => service
  .login(req.body)
  .then((token) => res.status(200).json({ token }))
  .catch(next);

export default login;
