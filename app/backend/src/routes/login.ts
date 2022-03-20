import { Router } from 'express';
import { auth, validate } from '../middlewares';
import { LoginController } from '../controllers';
import { loginSchema } from '../utils/validations';

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
  [
    validate(loginSchema),
    LoginController.login,
  ],
);

export default login;
