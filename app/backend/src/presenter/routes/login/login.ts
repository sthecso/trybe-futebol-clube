import { Router } from 'express';
import makeLoginController from '../../factories/login';
import routerAdapter from '../routerAdapter';

const loginRouter = Router();

loginRouter.post(
  '/',
  routerAdapter(makeLoginController()),
);

export default loginRouter;
