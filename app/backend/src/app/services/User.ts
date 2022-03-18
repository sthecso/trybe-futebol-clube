import Jwt from '../utils/jwt';
import { IUserLogin, ILoginResponse } from '../interfaces/IUser';
import { userRepo } from '../repositories/user.repository';

export default class UserService {
  private readonly jwt: Jwt;

  constructor() {
    this.jwt = new Jwt();
  }

  async login(loginInfo: IUserLogin): Promise<ILoginResponse> {
    const userInfo = await userRepo.login(loginInfo);
    return {
      user: userInfo,
      token: this.jwt.generateToken(userInfo),
    };
  }
}

export const userService = new UserService();
