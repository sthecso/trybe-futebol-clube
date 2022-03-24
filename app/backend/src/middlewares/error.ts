import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorHandle } from '../interfaces';

export default class ErrorHandler {
  public static zodError(): ErrorRequestHandler {
    return (err, _req, res, next) => {
      if (err instanceof ZodError) {
        const status = err.issues[0].code === 'invalid_type'
      && err.issues[0].received === 'undefined' ? 401 : 401;

        return res
          .status(status)
          .json({ message: JSON.parse(err.message)[0].message });
      }

      return next(err);
    };
  }

  public static domainError(): ErrorRequestHandler {
    return (err, _req, res, next) => {
      if (err instanceof ErrorHandle) {
        return res.status(err.code).json({
          message: err.message,
        });
      }

      return next(err);
    };
  }

  public static serverError(): ErrorRequestHandler {
    return (err, _req, res, _next) => {
      res.status(500).json({
        message: 'server error',
      });
    };
  }
}
