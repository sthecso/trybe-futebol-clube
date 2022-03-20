import { Router } from 'express';
import Login from '../controller/login';
import 'express-async-errors';
import { IUserWithIdDTO } from '../interface/user';
import validToken from '../controller/middleware/validToken';

declare module 'express-serve-static-core'{
  interface Request {
    user: IUserWithIdDTO
  }
}

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
    this.loginRoute.use(validToken);
    this.loginRoute.get('/validate', this.controllerLogin.validUser.bind(this.controllerLogin));
  }
}

export default new LoginRoute().loginRoute;
