import { Request, Response } from 'express';
import loginService from '../../services/LoginService';

async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;
  if (email === undefined || email === '' || password === undefined || password === '') {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const response = await loginService(email, password);
  return res.status(response.code).json(response.payload);
}

export default loginController;
