import { Router, Request, Response } from 'express';
import { ILoginController } from '../interfaces';
import loginControllerFactory from '../factories/login.controller.factory';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

const loginController: ILoginController = loginControllerFactory();

export default class Login {
  public router: Router;

  constructor() {
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post(
      '/',
      middlewares.validateBody(joiSchemas.login),
      async (req: Request, res: Response) => {
        const { code, data } = await loginController.login(req.body);
        return res.status(code).json(data);
      },
    );

    this.router.get(
      '/validate',
      middlewares.jwtAuth,
      async (req: Request, res: Response) => {
        const { code, data } = loginController.validate(req.tokenData!);
        return res.status(code).send(data);
      },
    );
  }
}
