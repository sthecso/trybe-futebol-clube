import { NextFunction, Request, Response } from 'express';

const validateEmail = (req: Request, res: Response, next:NextFunction) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) return res.status(400).json({ message: '"email" is required' });

  next();
};

export default validateEmail;
