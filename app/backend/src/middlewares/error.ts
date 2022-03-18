import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // Utilizei a chave name do método Error para passar o status
  const { name, message } = err;
  return res.status(name).json({ message });

  next(err);
};

const errorJwt: ErrorRequestHandler = (error, _req, res, next) => {
  if (error.message.includes('JsonWebTokenError')) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next(error);
};

const genericError: ErrorRequestHandler = (err, _req, res, next) => {
  return res.status(500).json({ error: 'Internal Server Error' });

  next(err);
};

export default [
  errorHandler,
  errorJwt,
  genericError,
];
