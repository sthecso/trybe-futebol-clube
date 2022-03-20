import * as express from 'express';
import validateJWT from '../auth/validateJWT';
import { validateEmail, validatePassword } from '../middlewares/validate.login';
import LoginController from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class LoginRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes(): express.Application {
    this.app
      .route('/login')
      .post(
        validateEmail,
        validatePassword,
        LoginController.getLogin,
      );

    this.app
      .route('/login/validate')
      .get(
        validateJWT,
        LoginController.getLogin,
      );

    return this.app;
  }
}

export default LoginRoutes;
