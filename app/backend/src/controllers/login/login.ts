import { Request, Response } from 'express';
import { Login } from '../../services';

export default class LoginController {
  private service: Login;

  constructor() {
    this.service = new Login();
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    console.log('loga aqui');

    const { code, message, payload } = await this.service.login(req.body);

    if (message) return res.status(code).json({ message });

    return res.status(code).json(payload);
  }
}
