import { IEmailAndPasswordDTO } from '../interfaces/ILogin';
import User from '../database/models/User';
import compare from '../utils/Bcrypt';
import Token from '../auth/createTokenJWT';

class LoginService {
  static async getLogin(value: IEmailAndPasswordDTO) {
    const { email, password } = value;
    const searchUser = await User.findOne({ where: { email } });

    if (!searchUser) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const comparePassword = await compare(password, searchUser.password);

    if (!comparePassword) {
      return { code: 401, message: 'Incorrect email or password' };
    }

    const token = Token.createToken(searchUser.email);

    const { id, username, role } = searchUser;
    return { user: { id, username, role, email }, token };
  }

  static async getUser() {
    const getUser = await User.findAll();
    return { code: 200, data: getUser[0].role };
  }
}

export default LoginService;
