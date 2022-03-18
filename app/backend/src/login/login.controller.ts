import { Router } from 'express';
import LoginService from './login.service';
import auth from '../utils/auth';

class LoginController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/', auth.verifyRoute, LoginService.index);
    this.router.post('/', LoginService.login);
  }
}

export default new LoginController();
