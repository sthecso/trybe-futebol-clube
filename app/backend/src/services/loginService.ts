import { StatusCodes } from 'http-status-codes';
import { ErrorHandle, ILogin, ILoginResult, IUser } from '../interfaces';
import { UserRepository } from '../repositories';
import JWT from '../utils/jwt';

export default class LoginService {
  public static async login(login: ILogin): Promise<ILoginResult> {
    const user = await UserRepository.findByEmail(login.email);

    if (!user) {
      throw new ErrorHandle(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

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

  public static async validate(token: string): Promise<string> {
    const user = new JWT().verify(token) as IUser;

    return user.role;
  }
}
