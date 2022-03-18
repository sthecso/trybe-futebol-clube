import { ErrorRequestHandler } from 'express';
import * as Joi from 'joi';
import StatusCodes from '../../utils/StatusCodes';

const joiError: ErrorRequestHandler = async (err, _req, res, next) => {
  if (Joi.isError(err)) {
    const { type, message } = err.details[0];
    const status = type === 'any.required'
      ? (StatusCodes.BAD_REQUEST) : (StatusCodes.UNPROCESSABLE_ENTITY);

    return res
      .status(status)
      .json({ message });
  }

  next(err);
};

export default joiError;
