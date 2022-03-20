import { ErrorRequestHandler } from 'express';

const serverError: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({
    message: 'server error',
  });
};

export default serverError;
