import { Router } from 'express';
import LoginService from './login.service';
// import auth from '../utils/auth';
import validateEmailandPass from '../middlewares/validate';

class LoginController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/validate', LoginService.validate);
    this.router.post('/', validateEmailandPass, LoginService.login);
  }
}

export default new LoginController();
