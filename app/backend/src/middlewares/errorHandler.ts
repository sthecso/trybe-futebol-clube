import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const error = err.message || 'Internal error';
  return res.status(status).send({ error });
};

export default errorHandler;
