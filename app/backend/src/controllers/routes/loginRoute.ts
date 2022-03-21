import { Router } from 'express';

import { ValidateLogin, Auth } from '../../middlewares';
import LoginController from '../Login';

const loginRouter = Router({ mergeParams: true });

loginRouter.post(
  '/',
  ValidateLogin.emptyFields,
  ValidateLogin.email,
  ValidateLogin.password,
  LoginController.login,
);

loginRouter.get(
  '/validate',
  Auth.retrieveUserRole,
);

export default loginRouter;
