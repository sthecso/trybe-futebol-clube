import { Router } from 'express';

import { ValidateLogin, Auth } from '../../middlewares';
import LoginController from '../Login';

const loginRouter = Router({ mergeParams: true });

loginRouter.post(
  '/login',
  ValidateLogin.emptyFields,
  ValidateLogin.email,
  ValidateLogin.password,
  LoginController.login,
);

loginRouter.get(
  '/login/validate',
  Auth.validate,
);

export default loginRouter;
