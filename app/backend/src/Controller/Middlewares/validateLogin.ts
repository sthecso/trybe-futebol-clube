import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { find } from '../../Services/userService';

const msg = 'All fields must be filled';

const validateEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (typeof email === 'undefined') {
    return res.status(401).json({ message: msg });
  }
  if (email === '') {
    return res.status(401).json({ message: msg });
  }
  next();
};

const validatePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (typeof password === 'undefined') {
    return res.status(401).json({ message: msg });
  }
  if (password === '') {
    return res.status(401).json({ message: msg });
  }
  next();
};

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await find(email);
  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  const userpass = user.getDataValue('password');
  const crypt = bcrypt.compareSync(password, userpass);

  if (!crypt) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default validateEmail;
export { validatePassword, validateLogin };
