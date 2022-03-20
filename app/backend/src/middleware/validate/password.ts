import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function validatePassword(req:Request, res: Response, next: NextFunction) {
  const { password = null } = req.body;
  if (!password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled',
    });
  }
  next();
}
export default validatePassword;
