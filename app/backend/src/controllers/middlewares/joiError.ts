import { isError } from 'joi';
import { NextFunction, Request, Response } from 'express';

const joiError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (!isError(err)) next(err);
  console.log(err, 'joi');
  return res.status(401).json({ message: err.message });
};

export default joiError;
