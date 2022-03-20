import { Request, Response } from 'express';
import login from '../services/loginService';

const loginController = async (req: Request, res: Response) => {
  const regex = /^(.+)@(.+)$/;
  const { email, password } = req.body;

  const messageInvalid = { message: 'All fields must be filled' };
  const messageIncorrect = { message: 'Incorrect email or password' };

  if (!email || email === '') return res.status(401).json(messageInvalid);

  const verifyEmail = email.match(regex);

  if (!verifyEmail) return res.status(401).json(messageIncorrect);

  if (!password || password === '') return res.status(401).json(messageInvalid);

  const user = await login(email, password);

  if (user === null) return res.status(401).json(messageIncorrect);

  return res.status(200).json(user);
};

export default loginController;
