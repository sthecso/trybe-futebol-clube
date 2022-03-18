import * as express from 'express';
import validateSchema from '../middlewares/index';
import { loginSchema } from '../schemas';
import LoginController from '../controllers';

class LoginRouter {
  public router: express.Router;

  private loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
  }

  login() {
    this.router.post('/', validateSchema(loginSchema), this.loginController.login);
  }
}

export default LoginRouter;
