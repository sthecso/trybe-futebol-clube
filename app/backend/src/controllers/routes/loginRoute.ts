import { Router } from 'express';

import { ValidateLogin } from '../../middlewares';
import LoginController from '../Login';

const loginRouter = Router({ mergeParams: true });

loginRouter.post(
  '/login',
  ValidateLogin.email,
  ValidateLogin.password,
  LoginController.login,
);

export default loginRouter;
