import { Request, Response } from 'express';
import loginService from '../services/loginService';

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await loginService({ email, password });

  if (result.message) {
    return res.status(result.code).json({ message: result.message });
  }

  return res.status(200).json(result);
};

export default userLogin;
