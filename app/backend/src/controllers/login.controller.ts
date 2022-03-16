import { Request, Response } from 'express';
import { ITokenData } from '../utils/interfaces';
import { LoginService } from '../services';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
    this.login = this.login.bind(this);
    this.validate = this.validate.bind(this);
  }

  async login(req: Request, res: Response) {
    const { code, data } = await this.loginService.login(req.body);
    return res.status(code).json(data);
  }

  validate(req: Request, res: Response) {
    const { role } = req.tokenData as ITokenData;
    res.status(200).send(role);
    return this;
  }
}
