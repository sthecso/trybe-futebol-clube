import { Router } from 'express';
import validateWithJoi from '../controllers/middlewares/validateWithJoi';
import loginUserSchema from '../utils/joiSchemas';
import UserController from '../controllers/userController';

const loginRoutes = Router();

loginRoutes.post('/login', validateWithJoi(loginUserSchema), UserController.loginUser);
loginRoutes.get('/login/validate', UserController.validateLogin);

export default loginRoutes;
