import { Request, Response, NextFunction } from 'express';
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const verifyEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if(!email) return res.status(401).json({ message : 'All fields must be filled'});
  const validate = EMAIL_REGEX.test(email);
  if (!validate) return res.status(401).json( { message: 'Incorrect email or password' });
  next();
};

const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if(!password) return res.status(401).json({ message : 'All fields must be filled'});

  next();
};

export { verifyEmail, verifyPassword };
