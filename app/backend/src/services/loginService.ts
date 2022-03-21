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
    const createToken = token.createToken(email);

    // const { id, username, role } = user;

    // return { user: { id, username, role, email }, createToken };

    return { user, createToken };
  }
}
