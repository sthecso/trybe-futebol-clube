import * as express from 'express';
import { loginControllerFactory } from '../factories';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

const loginController = loginControllerFactory();

export default class Login {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.route();
  }

  private route(): void {
    this.router.post(
      '/',
      middlewares.validateBody(joiSchemas.login),
      async (req: express.Request, res: express.Response) => {
        const { code, data } = await loginController.login(req.body);
        return res.status(code).json(data);
      },
    );

    this.router.get(
      '/validate',
      middlewares.jwtAuth,
      async (req: express.Request, res: express.Response) => {
        const { code, data } = loginController.validate(req.tokenData!);
        return res.status(code).send(data);
      },
    );
  }
}
