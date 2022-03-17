import { Request, Response, NextFunction } from 'express';

export default (err:Error, req:Request, res:Response, _next:NextFunction) => {
  console.log(err.message, 'message');
  if (err.message) {
    return res.status(401).json({ message: err.message });
  }
  console.log(err.message);
  return res.status(500).json({ error: 'errei alguma coisa' });
};
