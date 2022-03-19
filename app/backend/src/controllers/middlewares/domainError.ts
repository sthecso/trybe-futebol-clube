import { Request, Response, NextFunction } from 'express';

export default (err:Error, req:Request, res:Response, _next:NextFunction) => {
  if (err.message) {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ error: 'Internal server error' });
};
