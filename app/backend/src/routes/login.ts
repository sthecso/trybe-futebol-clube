import { Router } from 'express';
import { auth, validate } from '../middlewares';
import loginController from '../controllers';
import loginSchema from '../utils/validations';

const login = Router();

login.get(
  '/validate',
  [
    auth,
    loginController.validate,
  ],
);

login.post(
  '/',
  [
    validate(loginSchema),
    loginController.login,
  ],
);

export default login;
