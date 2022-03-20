import type { ErrorRequestHandler } from 'express';
import StatusCode from '../enums';

const error: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  return res.status(StatusCode.INTERNAL_ERROR).json({ message: err });
};

export default error;
