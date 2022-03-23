import { LoginController } from '../controllers';
import Router from './Router';

class LoginRouter extends Router {
  private LoginController: LoginController;

  constructor() {
    super();
    this.LoginController = new LoginController();
    this.route();
  }

  route() {
    this.router.post('/', this.LoginController.login);
    this.router.get('/validate', this.LoginController.validate);
  }
}

export default LoginRouter;
