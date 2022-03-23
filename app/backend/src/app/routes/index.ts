import { Router } from 'express';
import { clubController } from '../controllers/Club';
import { validateLogin } from '../controllers/middlewares/validateLogin';
import { userController } from '../controllers/User';

const login = Router();
const club = Router();

// login routes
login.post(
  '/',
  validateLogin.email,
  validateLogin.password,
  userController.login,
);
login.get(
  '/validate',
  validateLogin.tokenValidation,
  userController.loginValidate,
);

// club routes
club.get('/', clubController.getAll);
club.get('/:id', clubController.getById);

export default { login, club };
