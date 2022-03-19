import { ErrorRequestHandler } from 'express';
import APIError from '../../helpers/APIError';

const errorHandler: ErrorRequestHandler = (err: APIError | Error, _req, res, _next) => {
  // unexpected error
  const hasCodeProperty = Object.prototype.hasOwnProperty.call(err, 'code');
  if (!hasCodeProperty) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  enum ErrorMap {
    alreadyExists = 409,
    notFound = 404,
    badRequest = 400,
    unauthorized = 401,
    serverError = 500,
  }

  const apiError = err as APIError;
  const statusCode: number = ErrorMap[apiError.code];

  // domain error
  res.status(statusCode).json({ message: err.message });
};

export default errorHandler;
