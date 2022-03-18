import { Router } from 'express';
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

      const userFound = await this.loginService.findEmail();

      const token = await Token.generate({ email, password });
      return res.status(200).json({
        user: userFound,
        token,
      });
    });
  }
}

export default new Login().router;
