import { Router } from 'express';
import LoginUserController from '../controllers/user';
import UserValidateTokenController from '../controllers/userValidateTokenController';
import VerifyValidFields from '../middlewares/userMiddleware';
import ValidateAuth from '../middlewares/validateAuth';

class LoginRouter {
  public router: Router;

  private loginController = new LoginUserController();

  private validateFields = new VerifyValidFields();

  private validateAuth = new ValidateAuth();

  private validateController = new UserValidateTokenController();

  constructor() {
    this.router = Router();
    this.routePath();
  }

  private routePath() {
    this.router.post('/', this.validateFields.verifyRequest, this.loginController.findUser);

    this.router.get(
      '/validate',
      this.validateAuth.verifyToken,

      this.validateController.verifyControllerAuth,
    );
  }
}

export default LoginRouter;
