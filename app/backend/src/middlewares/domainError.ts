import { Request, Response, NextFunction } from 'express';

// INTERFACES
interface ErrorMap {
  [key: string]: number;
}
const errorMap: ErrorMap = {
  notFound: 404,
  badRequest: 400,
  unauthorized: 401,
};

const domainError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name.includes('JsonWebTokenError')) {
    return res
      .status(401)
      .json({ message: 'Invalid token' });
  }

  const status = errorMap[err.name];

  if (!status) return next(err);

  res.status(status).json({ message: err.message });
};

export default domainError;
