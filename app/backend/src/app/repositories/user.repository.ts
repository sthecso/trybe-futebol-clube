import { compare } from 'bcryptjs';
import { IUser, IUserLogin, IUserSequelizeResult } from '../interfaces/IUser';
import User from '../../database/models/User';

export default class UserRespository {
  private userModel = User;

  async login(loginInfo: IUserLogin): Promise<false | IUser> {
    const { email, password } = loginInfo;
    const result = await this.userModel.findOne({
      raw: true,
      where: { email },
    });
    const userInfo = result as unknown as IUserSequelizeResult;

    if (userInfo === null) return false;

    const comparison = await compare(password, userInfo.password);
    if (!comparison) return false;

    return {
      email: userInfo.email,
      id: userInfo.id,
      role: userInfo.role,
      username: userInfo.username,
    };
  }
}

export const userRepo = new UserRespository();

// Return plain object
// https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
