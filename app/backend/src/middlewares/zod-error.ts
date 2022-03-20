import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const zodError: ErrorRequestHandler = (err: ZodError, _req, res, next) => {
  if (err.name === 'ZodError') {
    const status = err.issues[0].code === 'invalid_type'
      && err.issues[0].received === 'undefined' ? 400 : 422;

    return res
      .status(status)
      .json({ message: JSON.parse(err.message)[0].message });
  }

  next(err);
};

export default zodError;
