import { Request, Response, NextFunction } from 'express';

const emailValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  if (email === '') {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }

  next();
};

export default emailValidation;
