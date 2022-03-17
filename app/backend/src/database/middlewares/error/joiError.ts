import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Joi from 'joi';

const joiError: ErrorRequestHandler = async (err, _req, res, next) => {
  if (Joi.isError(err)) {
    const { type, message } = err.details[0];
    const status = type === 'any.required'
      ? (StatusCodes.BAD_REQUEST) : (StatusCodes.UNPROCESSABLE_ENTITY);

    return res
      .status(status)
      .json({ error: message });
  }

  next(err);
};

export default joiError;
