import { Router } from 'express';
import { LoginController } from '../controllers/login';

class Login {
  public router: Router;

  private loginController = new LoginController();

  constructor() {
    this.router = Router();

    this.start();
  }

  private start() {
    this.router.post('/', this.loginController.handle);
  }
}

export default Login;
