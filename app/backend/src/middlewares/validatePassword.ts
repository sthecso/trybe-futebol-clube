import { NextFunction, Request, Response } from 'express';

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) { return res.status(401).json({ message: 'All fields must be filled' }); }

  if (password === '') {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validatePassword;
