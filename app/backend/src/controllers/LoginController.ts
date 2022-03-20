import { Request, Response } from 'express';
import LoginService from '../services';

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

  async validate(req: Request, res: Response) {
    const { userId } = res.locals;
    const { code, data } = await this.loginService.validate(userId);
    return res.status(code).send(data);
  }
}

export default LoginController;
