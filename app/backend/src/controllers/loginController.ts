import { Request, Response } from 'express';

import LoginService from '../services/loginService';

class Login {
  public Service = LoginService;

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await LoginService.loginService(email, password);
    return res.status(200).json(user);
  }
}

export default Login;
