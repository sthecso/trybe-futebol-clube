import { Request, Response } from 'express';
import validateLoginService from '../../services/validateLogin';

const MESSAGE_NOT_FOUND = { message: 'Token not found' };

async function validateLoginController(req: Request, res: Response) {
  const token = req.headers.authorization;
  if (token === undefined) { return res.status(401).json(MESSAGE_NOT_FOUND); }
  const response = await validateLoginService(token);
  return res.status(response.code).json(response.payload);
}

export default validateLoginController;
