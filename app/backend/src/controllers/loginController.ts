import * as express from 'express';
import loginService from '../services/loginService';
import { schemaBase, validateLogin } from './schemas/schema';

class LoginController {
  public path = '/login';

  public Service = loginService;

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
}

export default new LoginController();
