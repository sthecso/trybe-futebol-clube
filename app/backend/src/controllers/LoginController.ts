import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await LoginService.login(email, password);

  if (!token) {
    return res.status(401).json({ error: 'Username or password invalid' });
  }

  res.status(200).json(token);
};

export default LoginController;
