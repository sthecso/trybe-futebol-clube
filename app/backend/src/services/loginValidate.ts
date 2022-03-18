import User from '../database/models/User';
import { IUser } from '../interface/User';

export default class LoginValidate {
  public static async validateLogin(id:number) {
    const user = await User.findOne({ where: { id } });
    const { role } = user as unknown as IUser;
    return role;
  }
}
