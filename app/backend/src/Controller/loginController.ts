import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import User from '../database/models/Users';
import validateEmail, { validateLogin, validatePassword }
  from './Middlewares/validateLogin';

const login = Router();
const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

login.post(
  '/',
  validateEmail,
  validatePassword,
  validateLogin,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email },
      attributes: { exclude: ['password'] } });
    const codToken = jwt.sign({ token: user?.get('role') }, jwtSecret);
    return res.status(201).json({ user, token: codToken });
  },
);

export default login;
