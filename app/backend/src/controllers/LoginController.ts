import { Request, Response } from 'express';
import { LoginService } from '../services';
import { sing } from '../utils/jwt';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response) {
    const user = await this.loginService.login(req.body);
    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
    const token = sing({ ...user });
    return res.status(200).json({ user: { ...user }, token });
  }
}
