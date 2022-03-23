import IUserResponse from '../interfaces/IUserResponse';
import User from '../database/models/User';

export default class LoginValidateService {
  public static async login(id: number) {
    const getId = await User.findOne({ where: { id } });

    const { role } = getId as IUserResponse;

    return role;
  }
}
