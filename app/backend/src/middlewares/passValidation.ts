import { Request, Response, NextFunction } from 'express';

const passValidation = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  if (password === '') {
    return res.status(401).json({
      message: 'Incorrect email or password',
    });
  }

  next();
};

export default passValidation;
