import { compare } from 'bcryptjs';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import User from '../../database/models/User';

import { IUserRequest } from '../../interfaces/login';

class LoginModel {
  private userModel = User;

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle({ email, password }: IUserRequest) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      const message = 'Has no user with this email';
      return new this.ErrorCatcher(this.httpStatusCode.NotFound, message);
    }

    const verifyPassword = await compare(user.password, password);

    if (!verifyPassword) {
      const message = 'Password is incorrect';
      return new this.ErrorCatcher(this.httpStatusCode.BadRequest, message);
    }

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      data: user,
    };
  }
}

export default LoginModel;
