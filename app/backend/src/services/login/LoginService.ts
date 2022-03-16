import { ErrorCatcher, createToken } from '../../utils';

import { IUserRequest } from '../../interfaces/login';

import { LoginModel } from '../../models/login';

class LoginService {
  private loginModel = new LoginModel();

  private hasher = createToken;

  async handle(userData: IUserRequest) {
    const user = await this.loginModel.handle(userData);

    if (user instanceof ErrorCatcher) {
      return user;
    }

    const token = this.hasher(user.data);

    return {
      data: {
        user,
        token,
      },
    };
  }
}

export default LoginService;
