import { Request, Response } from 'express';
import { LoginService } from '../services';

class LoginController {
  static async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const login = await LoginService.getLogin({ email, password });

    if (login.message) {
      return res.status(login.code).json({ message: login.message });
    }

    res.status(200).json(login);
  }

  static async getUser(_req: Request, res: Response) {
    const { code, data } = await LoginService.getUser();
    res.status(code).json(data);
  }
}

export default LoginController;
