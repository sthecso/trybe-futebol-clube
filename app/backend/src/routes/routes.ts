import { Router } from 'express';
import loginValidations from '../middlewares/loginValidations';

const routes = Router();

// REQ 4

routes.post(
  '/login',
  loginValidations.validateEmail, 
  loginValidations.validatePassword,
  
)