import * as express from 'express';
import loginService from '../services/loginService';
import { schemaBase, validateLogin } from './schemas/schema';

class LoginController {
  public path = '/login';

  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.login);
  }

  public login = async (
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    schemaBase(validateLogin, req.body);
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    res.status(200).json(user);
  };
}

export default new LoginController();
