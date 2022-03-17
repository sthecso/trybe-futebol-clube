import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!Joi.isError(err)) return next(err);
  const { type } = err.details[0];

  switch (type) {
    case 'any.required':
      res.status(401).json({ message: 'All fields must be filled' });
      break;
    case 'string.empty':
      res.status(401).json({ message: 'All fields must be filled' });
      break;
    case 'string.email':
      res.status(401).json({ message: 'Incorrect email or password' });
      break;
    default:
      res.status(422).json({ message: err.message });
  }

  next();
};
