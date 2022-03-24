import { Router } from 'express';

import validateEmail from '../middlewares/validateEmail';
import validatePassword from '../middlewares/validatePassword';

import LoginController from '../controllers/LoginController';
import verifyJWT from '../middlewares/verifyJWT';
import LoginValidateController from '../controllers/LoginValidateController';

export const Login = Router();

Login.post('/', validateEmail, validatePassword, LoginController);
Login.get('/validate', verifyJWT, LoginValidateController);

export default Login;
