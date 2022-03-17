import { Request, Response, NextFunction } from 'express';

export default (err:Error, req:Request, res:Response, _next:NextFunction) => {
  console.log(err.message, 'message');
  if (err.message === 'Incorrect email or password') {
    return res.status(401).json({ error: 'Incorrect email or password' });
  }
  console.log(err.message);
  return res.status(500).json({ error: 'errei alguma coisa' });
};
