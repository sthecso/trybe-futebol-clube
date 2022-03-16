import { NextFunction, Request, Response } from 'express';

import { LoginService } from '../../services/login';

import { IUserRequest, ILoginResponse } from '../../interfaces/login';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class LoginController {
  private loginService = new LoginService();

  private httpStatusCode = HttpStatusCode;

  async handle(
    req: Request,
    res: Response,
    _nextMiddleware: NextFunction,
  ): Promise<Response<ILoginResponse>> {
    const userData = req.body as IUserRequest;

    const user = await this.loginService.handle(userData);

    if (user instanceof ErrorCatcher) {
      return res
        .status(user.httpStatusCode)
        .json({ message: user.message });
    }

    return res
      .status(this.httpStatusCode.Ok)
      .json(user.data);
  }
}

export default LoginController;
