import * as express from 'express';
import validateLoginJoi from '../middlewares/validate.login.joi';
import validateJWT from '../auth/validateJWT';
import { LoginController } from '../controllers';
import CommonRoutesConfig from './common.routes.config';

class LoginRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'LoginRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/login').post(
      validateLoginJoi,
      LoginController.getLogin,
    );

    this.app
      .route('/login/validate')
      .get(
        validateJWT,
        LoginController.getUser,
      );

    return this.app;
  }
}

export default LoginRoutes;
