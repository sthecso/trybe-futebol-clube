import { RequestHandler, Response, NextFunction } from 'express';
import { IRequest, ILogin } from '../utils/interfaces';
import * as service from '../services/login';

export const login: RequestHandler = (req, res, next) => service
  .login(req.body as ILogin)
  .then(({ user, token }) => res.status(200).json({ user, token }))
  .catch(next);

export const validate = (req: IRequest, res: Response, next: NextFunction) => service
  .validate(req.user as ILogin)
  .then(({ role }) => res.status(200).send(role))
  .catch(next);
