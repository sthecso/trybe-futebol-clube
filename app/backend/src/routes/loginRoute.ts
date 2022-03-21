import { Router } from 'express';
import loginController from '../controllers/loginController';
import token from '../auth/token';

const login = Router();

login.get('/', token.validateToken, loginController.login);

export default login;
