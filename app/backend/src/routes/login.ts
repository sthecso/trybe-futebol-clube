import { Router } from 'express';
import { validate } from '../middlewares';
import loginController from '../controllers';
import loginSchema from '../utils/validations';

const login = Router();

login.post(
  '/',
  [
    validate(loginSchema),
    loginController,
  ],
);

export default login;
