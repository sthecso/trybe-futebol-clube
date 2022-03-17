import { Router } from 'express';
import LoginService from './login.service';

class LoginController {
  router = Router();

  constructor() {
    this.Routes();
  }

  Routes() {
    this.router.get('/', LoginService.index);
    this.router.post('/', LoginService.create);
  }
}

export default new LoginController();
