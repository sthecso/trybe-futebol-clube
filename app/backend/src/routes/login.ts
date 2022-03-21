import { Router } from 'express';
import auth from '../middlewares';
import { LoginController } from '../controllers';

const login = Router();

login.get(
  '/validate',
  [
    auth,
    LoginController.validate,
  ],
);

login.post(
  '/',
  LoginController.login,
);

export default login;
