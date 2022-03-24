import { StatusCodes } from 'http-status-codes';
import { ErrorHandle, ILogin, ILoginResult } from '../interfaces';
import { UserRepository } from '../repositories';
import JWT from '../utils/jwt';

export default class LoginService {
  public static async login(login: ILogin): Promise<ILoginResult> {
    const user = await UserRepository.findByEmail(login.email);

    // verify if exist a user registred or password is correct
    if (!user) {
      throw new ErrorHandle(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    // compare passowrd
    await UserRepository.comparePassword(login.password, user.password);

    const userReturn = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = new JWT().sign(userReturn);

    return { user: userReturn, token };
  }
}
