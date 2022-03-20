import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

function validateEmail(req:Request, res: Response, next: NextFunction) {
  const { email = null } = req.body;
  if (!email) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'All fields must be filled' });
  }
  next();
}
export default validateEmail;
