import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/HttpException';

// references: https://bobbyhadz.com/blog/typescript-property-status-does-not-exist-on-type-error
const errorMiddlweare = (
  err: HttpException | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorMiddlweare;
