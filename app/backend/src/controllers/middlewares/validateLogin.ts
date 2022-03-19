import { NextFunction, Request, Response } from 'express';
import User from '../../database/models/User';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const findOneUser = await User.findOne({ where: { email } });

  if (!findOneUser) return res.status(400).json({ message: 'Invalid fields' });

  if (password !== findOneUser.password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

export default validateLogin;
