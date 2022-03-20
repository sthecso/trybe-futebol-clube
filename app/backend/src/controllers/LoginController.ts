import { Request, Response } from 'express';
import { LoginService } from '../services';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const { code, data } = await this.loginService.login(req.body);
    return res.status(code).json(data);
  }
}

export default LoginController;
