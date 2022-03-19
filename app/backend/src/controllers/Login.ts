import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import LoginService from '../services';
import jwtConfig from '../utils';

class LoginController {
  getLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { code, data } = await LoginService.getLogin({ email, password });

    if (data.message) {
      return res.status(code).json(data.message);
    }

    const dataEmail = data.email;
    const secret = jwtConfig.jwt.secret as unknown as string;

    const token = jwt.sign({}, secret, {
      subject: dataEmail,
      expiresIn: '7d',
      algorithm: 'HS256',
    });
    const { id, username, role } = data;
    res.status(code).json({ user: {
      id, username, role, email,
    },
    token });
  };

  getUser = async (_req: Request, res: Response) => {
    const { code, data } = await LoginService.getUser();
    res.status(code).json(data);
  };
}

export default new LoginController();
