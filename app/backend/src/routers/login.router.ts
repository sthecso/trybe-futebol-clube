import * as express from 'express';
import LoginController from '../controllers/login.controller';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

export default class Login {
  public router: express.Router;

  public loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.post(
      '/',
      middlewares.validateBody(joiSchemas.login),
      this.loginController.login,
    );

    this.router.get(
      '/validate',
      middlewares.jwtAuth,
      this.loginController.validate,
    );
  }
}
