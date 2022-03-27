import { NextFunction, Request, Response } from 'express';
import HttpException from '../../utils/HttpException';

const errorMiddlweare = (err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const errorMessage = err.message || 'Internal server error';
  return res.status(status).json({ message: errorMessage });
};

export default errorMiddlweare;
