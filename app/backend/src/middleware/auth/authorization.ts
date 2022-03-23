import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../../auth/Token';

async function validateAuth(req:Request, res: Response, next: NextFunction) {
  const { authorization = '' } = req.headers;
  try {
    const payload = await Token.verify(authorization);
    req.body.token = payload;
    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'token inválido' });
  }
}
export default validateAuth;
