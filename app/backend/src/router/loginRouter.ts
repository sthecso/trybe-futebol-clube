import { Router } from 'express';
import loginValidation from '../middlewares/loginValidation';
import tokenValidaton from '../middlewares/tokenValidaton';
import LoginController from '../controllers/LoginController';

const login = Router();

login.post('/', loginValidation, LoginController.login);
login.get('/validate', tokenValidaton);

export default login;
