import { Router } from 'express';

import { ValidateLoginRequest } from '../middlewares/login';

import { LoginController, ValidateTokenController } from '../controllers/login';

import { ValidateToken } from '../middlewares/auth';

class Login {
  public router: Router;

  private loginController = new LoginController();

  private validateLoginRequest = new ValidateLoginRequest();

  private validateTokenController = new ValidateTokenController();

  private validateTokenMiddleware = new ValidateToken();

  constructor() {
    this.router = Router();

    this.start();
  }

  private login() {
    this.router.post(
      '/',
      this.validateLoginRequest.handle,
      this.loginController.handle,
    );
  }

  private validateToken() {
    this.router.get(
      '/validate',
      this.validateTokenMiddleware.handle,
      this.validateTokenController.handle,
    );
  }

  private start() {
    this.login();

    this.validateToken();
  }
}

export default Login;
