import { Request, Response } from 'express';
import validateWithJoi from '../helpers/joiValidation';
import { loginSchema } from '../joi_schemas';
import LoginService from '../services/LoginService';
import ILogin from '../interfaces/ILogin';

class LoginController {
  private LoginService: LoginService;

  constructor() {
    this.LoginService = new LoginService();
  }

  login = async (req: Request, res: Response) => {
    validateWithJoi(loginSchema, req.body);
    const data: ILogin = req.body;
    const result = await this.LoginService.login(data);
    res.status(200).json(result);
  };

  validate = (req: Request, res: Response) => {
    const token = req.headers.authorization;
    if (token) {
      const role = this.LoginService.validate(token);
      return res.status(200).json(role);
    }
    res.status(400).json({ message: 'missing token' });
  };
}

export default LoginController;
