import { RequestHandler } from 'express';
import * as service from '../services/club';

export const readAll: RequestHandler = (req, res, next) => service
  .readAll()
  .then((clubs) => res.status(200).json(clubs))
  .catch(next);

export default readAll;
