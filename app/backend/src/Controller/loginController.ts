import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import findUser from '../Services/userService';
import validateEmail, { validateLogin, validatePassword }
  from './Middlewares/validateLogin';
import tokenValidation from './Middlewares/tokenValidation';

const login = Router();
const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

login.post(
  '/',
  validateEmail,
  validatePassword,
  validateLogin,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await findUser(email);
    const codToken = jwt.sign({ token: user?.get('role') }, jwtSecret);
    return res.status(200).json({ user, token: codToken });
  },
);

login.get('/validate', tokenValidation, async (req: Request, res: Response) => {
  const { validate } = req.body;
  const userRole = validate.token;
  res.status(200).send(userRole);
});

export default login;
