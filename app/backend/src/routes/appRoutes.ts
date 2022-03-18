import { Router } from 'express';
import validateWithJoi from '../controllers/middlewares/validateWithJoi';
import loginUserSchema from '../utils/joiSchemas';
import UserController from '../controllers/userController';

const appRoutes = Router();

appRoutes.post('/login', validateWithJoi(loginUserSchema), UserController.loginUser);

export default appRoutes;
