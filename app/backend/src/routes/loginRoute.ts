import { Router } from 'express';
import loginController from '../controllers/loginController';
import loginValidation from '../validations/loginValidation';

const login = Router();

login.post(
  '/',
  loginValidation.validateEmail,
  loginValidation.validatePassword,
  loginController.login,
);

export default login;
