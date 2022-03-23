import { UserModel } from '../database/models';
import { IUser, ILogin } from '../utils/interfaces';

export default class LoginService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  async login(data: ILogin): Promise<IUser | null> {
    const user = await this.userModel.findOne({
      where: { email: data.email },
    });

    if (!user || user.password !== data.password) return null;

    return user;
  }
}
