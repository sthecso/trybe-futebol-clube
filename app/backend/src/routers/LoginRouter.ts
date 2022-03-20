import * as express from 'express';
import { validateSchema, validateJWT } from '../middlewares';
import { loginSchema } from '../schemas';
import LoginController from '../controllers';

class LoginRouter {
  public router: express.Router;

  private loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.get('/validate', validateJWT, this.loginController.validate);
    this.router.post('/', validateSchema(loginSchema), this.loginController.login);
  }
}

export default LoginRouter;
