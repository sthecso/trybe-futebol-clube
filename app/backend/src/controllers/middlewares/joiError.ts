import { isError } from 'joi';
import { NextFunction, Request, Response } from 'express';

const joiError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (!isError(err)) return next(err);
  return res.status(401).json({ message: err.details[0].message });
};

export default joiError;
