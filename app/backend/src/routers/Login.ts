import { Router } from 'express';

import { ValidateLoginRequest } from '../middlewares/login';

import { LoginController } from '../controllers/login';
import { ValidateToken } from '../auth';

class Login {
  public router: Router;

  private loginController = new LoginController();

  private validateLoginRequest = new ValidateLoginRequest();

  private validateToken = new ValidateToken();

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

    this.router.get(
      '/validate',
      this.validateToken.handle,
    );
  }
}

export default Login;
