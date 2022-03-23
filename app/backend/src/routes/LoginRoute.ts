import { Router } from 'express';

import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';

import LoginController from '../controllers/LoginController';

export const Login = Router();

Login.post('/', validateEmail, validatePassword, LoginController);

export default Login;
