import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../../auth/Token';

async function validateAuth(req:Request, res: Response, next: NextFunction) {
  const { authorization = '' } = req.headers;
  try {
    await Token.verify(authorization);
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
export default validateAuth;
