import { Router } from 'express';
import validateEmail from '../controllers/middlewares/validateEmail';
import validatePassword from '../controllers/middlewares/validatePassword';
import LoginController from '../controllers/LoginController';
import validateLogin from '../controllers/middlewares/validateLogin';

export const Login = Router();

Login.post(
  '/',
  validateEmail,
  validatePassword,
  validateLogin,
  LoginController,
);

export default Login;
