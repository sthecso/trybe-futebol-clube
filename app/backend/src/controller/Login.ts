import { Router } from 'express';
import * as bcrypt from 'bcrypt';
import Token from '../auth/Token';
import LoginService from '../service/Login';

class Login {
  public router = Router();

  public loginService: LoginService;

  constructor() {
    this.post();
  }

  post() {
    this.router.post('/', async (req, res) => {
      const { email, password } = req.body;
      this.loginService = new LoginService(email, password);

      await this.loginService.findUser();
      const token = await Token.generate({ email });
      return res.status(200).json({
        user: this.loginService.userFound,
        token,
      });
    });
  }
}

export default new Login().router;
