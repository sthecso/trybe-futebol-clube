import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal error';
  return res.status(status).send({ message });
};

export default errorHandler;
