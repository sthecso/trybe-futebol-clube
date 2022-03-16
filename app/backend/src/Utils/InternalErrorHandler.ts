import { ErrorRequestHandler, Errback, Request, Response } from 'express';
import Codes from '../Enums/Codes';

const InternalErrorHandler:ErrorRequestHandler = (
  error: Errback,
  req: Request,
  res: Response,
  _next,
) => {
  res.status(Codes.internalServerError).json({ error: 'Internal Server Error' });
};

export default InternalErrorHandler;
