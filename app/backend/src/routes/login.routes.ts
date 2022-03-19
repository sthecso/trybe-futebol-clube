import * as express from 'express';
import validateJWT from '../auth/validateJWT';
import validationLoginJoi from '../middlewares/validationLogin.joi';
import LoginController from '../controllers';

const routesLogin = express.Router();

routesLogin.post(
  '/login',
  validationLoginJoi,
  LoginController.getLogin,
);

routesLogin.get(
  '/login/validate',
  validateJWT,
  LoginController.getUser,
);

export default routesLogin;
