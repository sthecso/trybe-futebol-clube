import * as express from 'express';
import loginService from '../services/loginService';
import auth from './middlewares/auth';
import { schemaBase, validateLogin } from './schemas/schema';

class LoginController {
  public path = '/login';

  public pathValidate = '/login/validate';

  public auth = auth;

  public Service = loginService;

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.login);
    this.router.get(this.pathValidate, this.auth, this.loginValidate);
  }

  public login = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      schemaBase(validateLogin, req.body);
      const { email, password } = req.body;
      const user = await this.Service.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public loginValidate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        const role = await this.Service.getUser(token);
        res.status(200).json(role);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default new LoginController();
