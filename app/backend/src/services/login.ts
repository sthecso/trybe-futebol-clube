import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories';
import { IUserComplete } from '../utils/interfaces';
import * as jwt from '../utils/jwt';

import * as messages from '../utils/messages';

import {
  UnauthorizedError,
  UnprocessableError,
} from './errors';

class LoginService {
  public static generateToken(user: IUserComplete) {
    const token = jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return token;
  }

  public static response(user: IUserComplete, token: string) {
    const data = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };

    return data;
  }

  public static async validateBody(
    email: IUserComplete['email'],
    password: IUserComplete['password'],
  ) {
    const missingFieldErr = new UnauthorizedError(
      messages.user.required,
    );

    if (!email || !password) throw missingFieldErr;

    const emailTypeErr = new UnprocessableError(
      messages.user.email.base,
    );

    if (typeof email !== 'string') throw emailTypeErr;

    const passwordTypeErr = new UnprocessableError(
      messages.user.password.base,
    );

    if (typeof password !== 'string') throw passwordTypeErr;
  }

  public static async login(
    email: IUserComplete['email'],
    password: IUserComplete['password'],
  ) {
    const user: IUserComplete = await UserRepository.findByEmail(email);

    const err = new UnauthorizedError(messages.user.incorrect);

    if (!user) throw err;

    const validatePassword = await bcrypt.compare(
      password,
      user.password,
    );

    if (!validatePassword) throw err;

    const token = this.generateToken(user);
    const data = this.response(user, token);

    return data;
  }
}

export default LoginService;
