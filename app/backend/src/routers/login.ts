import { Router } from 'express';
import validateJwt from '../controllers/middlewares/validateJwt';
import { loginController, validateLogin } from '../controllers/loginController';

const login = Router();

login.post('/', loginController);
login.get('/validate', validateJwt, validateLogin);

export default login;
