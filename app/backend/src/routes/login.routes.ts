import * as express from 'express';
import validationLoginJoi from '../middlewares/validationLogin.joi';
import LoginController from '../controllers';

const routesLogin = express.Router();

routesLogin.post(
  '/login',
  validationLoginJoi,
  LoginController.create,
);

export default routesLogin;
