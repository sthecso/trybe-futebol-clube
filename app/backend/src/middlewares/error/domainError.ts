import { ErrorRequestHandler } from 'express';
import UnauthorizedError from '../../services/errors';

const domainError: ErrorRequestHandler = async (err, _req, res, next) => {
  if (err instanceof UnauthorizedError) {
    const { code, message } = err;

    res.status(code).json(message);
  }

  next(err);
};

export default domainError;
