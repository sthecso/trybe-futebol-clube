import { Request, Response, NextFunction } from 'express';

const validEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const validPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

const validLogin = [
  validEmail,
  validPassword,
];

export default validLogin;
