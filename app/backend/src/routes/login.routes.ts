import * as express from 'express';
import validateJWT from '../auth/validateJWT';
import { LoginController, ClubsController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';
import { validateEmail, validatePassword } from '../middlewares/validate.login';

class LoginRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/login').post(
      validateEmail,
      validatePassword,
      LoginController.getLogin,
    );

    this.app
      .route('/login/validate')
      .get(
        validateJWT,
        LoginController.getUser,
      );

    this.app
      .route('/clubs')
      .get(
        ClubsController.getClubs,
      );

    return this.app;
  }
}

export default LoginRoutes;