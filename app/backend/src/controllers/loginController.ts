import { Request, Response } from 'express';
import loginService from '../services/loginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await loginService.login(email, password);

    if (!result) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }

    res.status(200).json(result);
  }
}
