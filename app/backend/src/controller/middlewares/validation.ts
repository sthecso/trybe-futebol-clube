import { NextFunction, Request, Response } from 'express';

const validateEmail = (req: Request, res: Response, next:NextFunction) => {
  const { email } = req.body;
  if (!email) return res.status(401).json({ message: 'All fields must be filled' });
  next();
};

const validatePassword = (req: Request, res: Response, next:NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(401).json({ message: 'All fields must be filled' });
  next();
};

const validate = [validateEmail, validatePassword];

export default validate;
