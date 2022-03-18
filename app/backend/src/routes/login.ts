import { Router } from 'express';
import Login from '../controller/login';

class LoginRoute {
  public loginRoute:Router;

  public controllerLogin:Login;

  constructor() {
    this.loginRoute = Router();

    this.controllerLogin = new Login();
    this.Routes();
  }

  Routes() {
    this.loginRoute.post('/', this.controllerLogin.post.bind(this.controllerLogin));
  }
}
// loginRoute.post('/', async () => {

// });

export default new LoginRoute().loginRoute;
