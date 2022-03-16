import { Router } from 'express';
import { LoginController } from '../controllers/login';

class Login {
  private router: Router;

  private loginController = new LoginController();

  constructor() {
    this.router = Router();
  }

  handle() {
    this.router.post('/', this.loginController.handle);
  }
}

// router.post('/', LoginController.handle);

export default Login;
