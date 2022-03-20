import { compare } from 'bcryptjs';

import { UserRepository } from '../../database/repositories';

import { IUserRequest } from '../../interfaces/login';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class LoginModel {
  private userRepository = new UserRepository();

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle({ email, password }: IUserRequest) {
    const user = await this.userRepository.findOne({ email });

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
