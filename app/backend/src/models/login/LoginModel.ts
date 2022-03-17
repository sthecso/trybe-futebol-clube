import { compare } from 'bcryptjs';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import User from '../../database/models/User';

import { IUserRequest } from '../../interfaces/login';

class LoginModel {
  private userEntity = User;

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle({ email, password }: IUserRequest) {
    const user = await this.userEntity.findOne({ where: { email } });

    if (!user) {
      const message = 'Incorrect email or password';
      return new this.ErrorCatcher(this.httpStatusCode.NotAuthorized, message);
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      const message = 'Incorrect email or password';
      return new this.ErrorCatcher(this.httpStatusCode.NotAuthorized, message);
    }

    return {
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    };
  }
}

export default LoginModel;
