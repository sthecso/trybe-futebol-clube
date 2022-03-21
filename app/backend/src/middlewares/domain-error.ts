import { ErrorRequestHandler } from 'express';
import { ErrorHandler } from '../interfaces';

const domainError: ErrorRequestHandler = (err, _req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.code)
      .json({ message: err.message });
  }

  next(err);
};

export default domainError;
