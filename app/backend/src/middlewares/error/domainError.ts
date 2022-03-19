import { ErrorRequestHandler } from 'express';

const domainError: ErrorRequestHandler = async (err, _req, res, next) => {
  if (err.code) {
    const { code, message } = err;

    res.status(code).json({ message });
  }

  next(err);
};

export default domainError;
