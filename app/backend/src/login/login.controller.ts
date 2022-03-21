import { Router } from 'express';
import LoginService from './login.service';
import { validateEmail } from '../middlewares/validate';

class LoginController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/validate', LoginService.validate);
    this.router.post('/', validateEmail, LoginService.login);
  }
}

export default new LoginController();
