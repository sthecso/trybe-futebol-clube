import { Router } from 'express';
import validateJwt from '../controllers/middlewares/validateJwt';
import loginController from '../controllers/loginController';

const login = Router();

login.post(
  '/',
  loginController,
);

login.get(
  '/validate',
  validateJwt,
);

export default login;
