import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';
import LoginValidateService from '../service/LoginValidateSer';

const LoginValidateController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const verifiedToken = verifyToken(token);

  const { id } = verifiedToken as JwtPayload;
  const idNumber = Number(id);
  const role = await LoginValidateService.login(idNumber);

  return res.status(200).json(role);
};

export default LoginValidateController;
