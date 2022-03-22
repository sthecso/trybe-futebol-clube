import { Router } from 'express';

import validateJWT from '../controllers/middlewares/validateJWT';
import validateEmail from '../controllers/middlewares/validateEmail';
import validatePassword from '../controllers/middlewares/validatePassword';

import LoginController from '../controllers/LoginController';
import LoginValidateController from '../controllers/LoginValidateController';

export const Login = Router();

Login.post(
  '/',
  validateEmail,
  validatePassword,
  LoginController,
);

Login.get(
  '/validate',
  validateJWT,
  LoginValidateController,
);

export default Login;
