import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import LoginService from '../services/Login';
import jwtConfig from '../utils';

class LoginController {
  create = async (req: Request, res: Response) => {
    const { code, data } = await LoginService.create(req.body);

    const { email } = data;
    const secret = jwtConfig.jwt.secret as unknown as string;

    const token = jwt.sign({ data: email }, secret, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    res.status(code).json({ user: data, token });
  };
}

export default new LoginController();
