import { Router } from 'express';
import validateToken from '../Middlewares/TokenValidate';
import validateLogin from '../Middlewares/ValidateLogin';
import * as UserController from '../controllers/User';

const rootRoute = Router();

rootRoute.post('/login', validateLogin, UserController.login);
rootRoute.get('/login/validate', validateToken, UserController.getRole);

export default rootRoute;
