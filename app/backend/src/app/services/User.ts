import { jwt } from '../utils/jwt';
import { IUserLogin, ILoginResponse } from '../interfaces/IUser';
import { userRepo } from '../repositories/user.repository';

export default class UserService {
  static async login(loginInfo: IUserLogin): Promise<ILoginResponse | false> {
    const userInfo = await userRepo.login(loginInfo);
    if (userInfo) {
      return {
        user: userInfo,
        token: jwt.generateToken(userInfo),
      };
    }
    return false;
  }
}

export const userService = UserService;
