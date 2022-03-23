import UserModel from '../database/models/User';
import { IUser, ILogin } from '../utils/interfaces';

export default class LoginService {
  static async login(data: ILogin): Promise<IUser | null> {
    const user = await UserModel.findOne({
      where: { email: data.email },
    });

    if (!user || user.password !== data.password) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }
}
