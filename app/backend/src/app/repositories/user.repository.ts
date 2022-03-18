import { IUser, IUserLogin } from '../interfaces/IUser';
import User from '../../database/models/User';

export default class UserRespository {
  private userModel = User;

  async login(loginInfo: IUserLogin): Promise<IUser> {
    const { email, password } = loginInfo;
    const result = await this.userModel.findOne({ where: { email, password } });
    return result as unknown as IUser;
  }
}

export const userRepo = new UserRespository();
