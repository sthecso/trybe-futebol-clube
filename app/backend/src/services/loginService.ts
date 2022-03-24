import * as bcrypt from 'bcryptjs';
import userModel from '../database/models/usersModel';
import token from '../auth/token';

export default class Login {
  public static async login(email: string, password: string) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return false;
    }
    const { id, username, role } = user;

    const createToken = token.createToken({ email });

    return { user: { id, username, role, email }, token: createToken };
  }

  public static async findrole(email: string) {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    const { role } = user;

    return { role };
  }
}
