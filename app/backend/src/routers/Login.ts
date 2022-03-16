import { Router } from 'express';

import { ValidateLoginRequest } from '../middlewares/login';

import { LoginController } from '../controllers/login';

class Login {
  public router: Router;

  private loginController = new LoginController();

  private validateLoginRequest = new ValidateLoginRequest();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.post(
      '/',
      this.validateLoginRequest.handle,
      this.loginController.handle,
    );
  }
}

export default Login;
