import { StatusCodes } from 'http-status-codes';
import { ErrorHandler, ILogin, ILoginResult } from '../interfaces';
import { UserRepository } from '../repositories';
import * as jwt from '../utils/jwt';

export default class LoginService {
  public static async login(login: ILogin): Promise<ILoginResult> {
    const user = await UserRepository.findByEmail(login.email);

    // verify if exist a user registred or password is correct
    if (!user) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    // compare passowrd
    await UserRepository.comparePassword(login.password, user.password);

    const userReturn = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(userReturn);

    return { user: userReturn, token };
  }
}
