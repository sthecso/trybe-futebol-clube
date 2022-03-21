import { Router } from 'express';
import ValidateLogin from '../controllers/middlewares/validateLogin';
import UserController from '../controllers/User';

const login = Router();
const userController = new UserController();
const validateLogin = new ValidateLogin();

login.post(
  '/',
  validateLogin.email,
  validateLogin.password,
  userController.login,
);

export default { login };
