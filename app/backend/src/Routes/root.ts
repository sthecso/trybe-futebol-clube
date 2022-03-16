import { Router } from 'express';
import validateLogin from '../Middlewares/ValidateLogin';
import * as UserController from '../controllers/User';

const rootRoute = Router();

rootRoute.post('/login', validateLogin, UserController.login);

export default rootRoute;
