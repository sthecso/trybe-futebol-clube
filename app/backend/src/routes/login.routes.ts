import * as express from 'express';
// import validateJWT from '../auth/validateJWT';
import { validateEmail, validatePassword } from '../middlewares/validate.login';
import LoginController from '../controllers';

const routesLogin = express.Router();

routesLogin.post(
  '/login',
  validateEmail,
  validatePassword,
  LoginController.getLogin,
);

routesLogin.get(
  '/login/validate',
  // validateJWT,
  LoginController.getUser,
);

export default routesLogin;
