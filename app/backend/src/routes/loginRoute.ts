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

login.get(
  '/validate',
  loginController.findRole,
);

export default login;
