import { Router } from 'express';
import LoginUserController from '../controllers/user';
import VerifyValidFields from '../middlewares/userMiddleware';

class LoginRouter {
  public router: Router;

  private loginController = new LoginUserController();

  private validateFields = new VerifyValidFields();

  constructor() {
    this.router = Router();
    this.start();
  }

  private start() {
    this.router.post('/', this.validateFields.verifyRequest, this.loginController.findUser);
  }
}

export default LoginRouter;
