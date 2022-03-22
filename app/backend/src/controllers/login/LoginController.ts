import { LoginService } from '../../services/login';

import { IUserRequest } from '../../interfaces/login';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class LoginController {
  private loginService = new LoginService();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(userData: IUserRequest) {
    const user = await this.loginService.handle(userData);

    if (user instanceof this.ErrorCatcher) {
      return {
        httpStatusCode: user.httpStatusCode,
        result: { message: user.message },
      };
    }

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: user.data,
    };
  }
}

export default LoginController;
