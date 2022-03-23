import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { sing } from '../utils/jwt';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const user = await LoginService.login(req.body);
    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
    const token = sing({ ...user });
    return res.status(200).json({ user: { ...user }, token });
  }
}
