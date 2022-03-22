import { Request, Response } from 'express';
import LoginValidateService from '../services/LoginValidateService';

const LoginValidateController = async (req: Request, res: Response) => {
  const { id } = req.body;
  const idNumber = Number(id);
  const role = await LoginValidateService.login(idNumber);

  res.status(200).json(role);
};

export default LoginValidateController;
