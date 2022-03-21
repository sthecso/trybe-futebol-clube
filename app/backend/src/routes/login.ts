import * as express from 'express';
import { loginValidation, authToken } from '../middlewares';
import { LoginController } from '../controllers';

export default class LoginRoute {
  public login: express.Router; // public para declarar no app.ts

  private loginController: LoginController;

  constructor() {
    this.login = express.Router(); // minha rota
    this.loginController = new LoginController(); // instanciação do controller
    this.routes(); // declarando o método
  }

  private routes(): void {
    this.login.post(
      '/',
      loginValidation,
      this.loginController.login,
    );

    this.login.get(
      '/validate',
      authToken,
      this.loginController.loginValidate,
    );
  }
}
