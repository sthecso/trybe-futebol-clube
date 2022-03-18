import { Request, Response, NextFunction } from 'express';
import User from '../../database/models/Users';

const msg = 'All fields must be filled';

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (typeof email === 'undefined') {
    return res.status(400).json({ message: msg });
  }
  if (email === '') {
    return res.status(400).json({ message: msg });
  }
  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (typeof password === 'undefined') {
    return res.status(400).json({ message: msg });
  }
  if (password === '') {
    return res.status(400).json({ message: msg });
  }
  next();
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  const useremail = user?.getDataValue('email');
  const userpass = user?.getDataValue('password');

  if (!user || useremail !== email || userpass !== password) {
    return res.status(400).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateEmail;
export { validatePassword, validateLogin };
