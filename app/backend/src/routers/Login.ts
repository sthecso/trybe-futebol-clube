import { NextFunction, Request, Response, Router } from 'express';

import { LoginController, ValidateTokenController } from '../controllers/login';

import { ValidateLoginRequest } from '../middlewares/login';

import { ValidateToken } from '../middlewares/auth';

import { IUserRequest, IUserResponse } from '../interfaces/login';

class Login {
  public router: Router;

  private loginController = new LoginController();

  private validateLoginRequest = new ValidateLoginRequest();

  private validateTokenController = new ValidateTokenController();

  private validateTokenMiddleware = new ValidateToken();

  constructor() {
    this.router = Router();

    this.start();
  }

  private async validateLogin(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const userData = req.body as IUserRequest;

      const response = await this.validateLoginRequest.handle(userData);

      if (response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private login() {
    this.router.post(
      '/',
      this.validateLogin,
      async (req: Request, res: Response, nextMiddleware: NextFunction) => {
        try {
          const userData = req.body as IUserRequest;

          const { httpStatusCode, result } = await this.loginController.handle(userData);

          return res.status(httpStatusCode).json(result);
        } catch (error) {
          nextMiddleware(error);
        }
      },
    );
  }

  private isValidToken(req: Request, res: Response, nextMiddleware: NextFunction) {
    try {
      const { authorization: token } = req.headers;

      const response = this.validateTokenMiddleware.handle(token);

      if ('httpStatusCode' in response) {
        const { httpStatusCode, result } = response;

        return res.status(httpStatusCode).json(result);
      }

      req.userDataDecoded = response;

      nextMiddleware();
    } catch (error) {
      nextMiddleware(error);
    }
  }

  private validateToken() {
    this.router.get(
      '/validate',
      this.isValidToken,
      (req: Request, res: Response, nextMiddleware: NextFunction) => {
        try {
          const userData = req.userDataDecoded as IUserResponse;

          const { httpStatusCode, result } = this.validateTokenController.handle(userData);

          return res.status(httpStatusCode).json(result);
        } catch (error) {
          nextMiddleware(error);
        }
      },
    );
  }

  private start() {
    this.login();

    this.validateToken();
  }
}

export default Login;
