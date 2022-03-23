import { Router } from 'express';
import loginController from '../controllers/loginController';

const login = Router();

login.post('/', loginController.login);

export default login;
