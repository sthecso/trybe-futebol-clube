import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const user = req.body;
    const service = await LoginService.login(user.email, user.password);

    if (service.message) {
      return res.status(service.code).json({ message: service.message });
    }

    res.status(200).json(service);
  }

  public static async validate(req: Request, res: Response) {
    const { user } = req.body;
    const role = await LoginService.validate(user);

    res.status(200).json(role);
  }
}
