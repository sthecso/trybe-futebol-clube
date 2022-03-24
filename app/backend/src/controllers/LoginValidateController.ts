import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt';
import LoginValidateService from '../services/LoginValidateSer';

const LoginValidateController = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;

  const verifiedToken = verifyToken(token);

  const { id } = verifiedToken as JwtPayload;

  const role = await LoginValidateService.login(id);

  res.status(200).json(role);
};

export default LoginValidateController;
