import * as bcrypt from 'bcryptjs';
import User from '../database/models/user';
import utilsJWT from '../auth/utilsJWT';

export default class LoginService {
  public static async login(email: string, password: string) {
    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return {
        code: 401,
        message: 'Incorrect email or password',
      };
    }

    const correctPassword = await bcrypt.compare(password, findUser.password);

    if (!correctPassword) {
      return {
        code: 401,
        message: 'Incorrect email or password',
      };
    }

    const { id, role, username } = findUser;
    const token = utilsJWT.createJwt(email);
    return { user: { id, username, role, email }, token };
  }
}
