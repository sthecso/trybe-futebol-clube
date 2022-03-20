import { Router } from 'express';
import Login from '../controller/login';
import 'express-async-errors';
import { IUserWithIdDTO } from '../interface/user';
import ValidToken from '../controller/middleware/validToken';

declare module 'express-serve-static-core'{
  interface Request {
    user: IUserWithIdDTO
  }
}

class LoginRoute {
  public loginRoute:Router;

  public controllerLogin:Login;

  public checkToken:ValidToken;

  constructor() {
    this.loginRoute = Router();

    this.controllerLogin = new Login();
    this.checkToken = new ValidToken();
    this.Routes();
  }

  Routes() {
    this.loginRoute.post('/', this.controllerLogin.post.bind(this.controllerLogin));
    this.loginRoute.use(this.checkToken.VerifyToken.bind(this.checkToken));
    this.loginRoute.get('/validate', this.controllerLogin.validUser.bind(this.controllerLogin));
  }
}

export default new LoginRoute().loginRoute;
