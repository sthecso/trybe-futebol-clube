import { Router, Request, Response } from 'express';
import { loginFactory } from '../factories';
import { ILoginService } from '../interfaces';
import * as middlewares from '../middlewares';
import * as joiSchemas from '../utils/joi.schemas';

const loginService: ILoginService = loginFactory();

export class LoginRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.login();
    this.validateLogin();
  }

  private login(): void {
    this.router.post(
      '/',
      middlewares.validateBody(joiSchemas.login),
      async (req: Request, res: Response) => {
        const { code, data } = await loginService.login(req.body);
        return res.status(code).json(data);
      },
    );
  }

  private validateLogin(): void {
    this.router.get(
      '/validate',
      middlewares.jwtAuth,
      async (req: Request, res: Response) => res.status(200).send(req.tokenData!.role),
    );
  }
}
