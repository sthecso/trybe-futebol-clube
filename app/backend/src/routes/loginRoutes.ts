import { Router } from 'express';
import loginValidations from '../middlewares/loginValidations';
import loginController from '../controllers/loginController';

const routes = Router();

// REQ 4

routes.post(
  '/login',
  loginValidations.validateEmail,
  loginValidations.validatePassword,
  loginController,
);

export default routes;
