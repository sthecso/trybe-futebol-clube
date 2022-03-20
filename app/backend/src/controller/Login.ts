import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import validateEmail from '../middleware/validate/email';
import validatePassword from '../middleware/validate/password';
import Token from '../auth/Token';
import LoginService from '../service/Login';

const validLogin = [
  validateEmail,
  validatePassword,
];

class Login {
  public router = Router();

  public loginService: LoginService;

  constructor() {
    this.post();
    this.validate();
  }

  post() {
    this.router.post('/', validLogin, async (req: Request, res: Response) => {
      const { email, password } = req.body;
      this.loginService = new LoginService(email, password);
      await this.loginService.findUser();

      if (!this.loginService.userFound) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Incorrect email or password' });
      }

      if (!this.loginService.passwordIsValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Incorrect email or password' });
      }

      const token = await Token.generate({ email });
      return res.status(200).json({
        user: this.loginService.userFound,
        token,
      });
    });
  }

  validate() {
    this.router.get('/validate', async (req: Request, res: Response) => {
      const { authorization = '' } = req.headers;

      try {
        const token = await Token.verify(authorization);

        if (typeof token !== 'string') {
          this.loginService = new LoginService(token.email, 'password');
          await this.loginService.findUser();

          if (this.loginService.userFound) {
            return res.status(StatusCodes.OK).send(this.loginService.userFound.role);
          }
        }
        return res.status(StatusCodes.UNAUTHORIZED).send();
      } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).send();
      }
    });
  }
}

export default new Login().router;
