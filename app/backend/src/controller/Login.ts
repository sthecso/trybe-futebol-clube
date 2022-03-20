import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Token from '../auth/Token';
import LoginService from '../service/Login';

class Login {
  public router = Router();

  public loginService: {
    id: number;
    username: string;
    role: string;
    email: string;
  } | null;

  constructor() {
    this.post();
  }

  post() {
    this.router.post('/', async (req, res) => {
      const { email, password } = req.body;
      this.loginService = await new LoginService(email, password).findUser();

      if (!this.loginService) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Incorrect email or password' });
      }

      const token = await Token.generate({ email });
      return res.status(200).json({
        user: this.loginService,
        token,
      });
    });
  }
}

export default new Login().router;
