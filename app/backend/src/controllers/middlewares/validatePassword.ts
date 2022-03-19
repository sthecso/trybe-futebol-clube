import { NextFunction, Request, Response } from 'express';

const validatePassword = (req: Request, res: Response, next:NextFunction) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  if (!password) return res.status(400).json({ message: '"password" is required' });

  next();
};

export default validatePassword;
