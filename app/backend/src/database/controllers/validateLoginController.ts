import { Request, Response } from 'express';
import validateLoginService from '../services/validateLoginService';

async function validateLoginController(req: Request, res: Response) {
  const token = req.headers.authorization;
  if (token === undefined) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const response = await validateLoginService(token);
  return res.status(response.code).json(response.payload);
}

export default validateLoginController;
