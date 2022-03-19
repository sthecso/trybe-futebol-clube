import * as Joi from 'joi';
import { ErrorRequestHandler } from 'express';

const joiError: ErrorRequestHandler = (err, _req, res, next) => {
  if (!Joi.isError(err)) return next(err);
  let code: number;

  const errorType = err.details[0].type;

  if (errorType.match(/required/g) || errorType.match(/empty/g)) {
    code = 401;
  } else {
    code = 422;
  }

  return res.status(code).json({ message: err.message });
};

export default joiError;
