import { Router } from 'express';
import LoginService from './login.service';
// import auth from '../utils/auth';
// import validateEmailandPass from '../middlewares/validate';

class LoginController {
  router = Router();

  constructor() {
    this.Routes();
  }

  async Routes() {
    this.router.get('/validate', await LoginService.validate);
    this.router.post('/', await LoginService.login);
  }
}

export default new LoginController();
