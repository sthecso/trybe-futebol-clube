import { Router } from 'express';
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

      const token = await Token.generate({ email });
      return res.status(200).json({
        user: this.loginService,
        token,
      });
    });
  }
}

export default new Login().router;
