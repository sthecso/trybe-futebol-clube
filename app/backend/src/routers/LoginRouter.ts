import * as express from 'express';
import LoginController from '../controllers';

class LoginRouter {
  public router: express.Router;

  private loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
  }
}

export default LoginRouter;
