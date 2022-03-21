import Jwt from '../utils/jwt';
import { IUserLogin, ILoginResponse } from '../interfaces/IUser';
import { userRepo } from '../repositories/user.repository';

export default class UserService {
  private readonly jwt: Jwt;

  constructor() {
    this.jwt = new Jwt();
  }

  async login(loginInfo: IUserLogin): Promise<ILoginResponse | false> {
    const userInfo = await userRepo.login(loginInfo);
    if (userInfo) {
      return {
        user: userInfo,
        token: this.jwt.generateToken(userInfo),
      };
    }
    return false;
  }
}

export const userService = new UserService();
