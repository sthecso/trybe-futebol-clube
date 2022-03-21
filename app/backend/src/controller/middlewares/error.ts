import { NextFunction, Request, Response } from 'express';

export default (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (
    error instanceof SyntaxError
    && error.message.includes('Unexpected string in JSON')
  ) {
    return res.status(400).json({ message: 'Invalid body syntax' });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
