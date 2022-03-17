import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const serverError: ErrorRequestHandler = async (
  err,
  _req,
  res,
  _next,
) => {
  console.error(err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal Server Error' });
};

export default serverError;