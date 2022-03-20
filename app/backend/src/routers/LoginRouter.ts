import { Router, Request, Response } from 'express';
import StatusCode from '../enums';
import { validateSchema, validateJWT } from '../middlewares';
import { loginSchema } from '../schemas';
import { LoginController } from '../controllers';

class LoginRouter {
  public router: Router;

  private loginController: LoginController;

  constructor() {
    this.loginController = new LoginController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.get(
      '/validate',
      validateJWT,
      async (req: Request, res: Response) => {
        const { role } = res.locals.tokenData;
        return res.status(StatusCode.OK).send(role);
      },
    );
    this.router.post('/', validateSchema(loginSchema), this.loginController.login);
  }
}

export default LoginRouter;
