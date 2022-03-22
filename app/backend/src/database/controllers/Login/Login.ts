import { Request, Response } from 'express';
import loginService from '../../services/LoginService';

const MSG_FIELDS_FILLED = { message: 'All fields must be filled' };

async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (email === undefined || email === '' || password === undefined || password === '') {
    return res.status(401).json(MSG_FIELDS_FILLED);
  }
  const response = await loginService(email, password);
  return res.status(response.code).json(response.payload);
}

export default login;
