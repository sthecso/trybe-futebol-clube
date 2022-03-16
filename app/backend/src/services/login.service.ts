import { compare } from 'bcryptjs';
import { ICredentials } from '../utils/interfaces';
import UserModel from '../database/models/User';
import { jwtGenerator } from '../helpers';

export default class LoginService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async login(credentials: ICredentials) {
    const user = await this.userModel.findOne({
      where: { email: credentials.email },
    });

    if (!user || !(await compare(credentials.password, user.password))) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const { id, email, role, username } = user;

    const token = jwtGenerator({ id, email, role, username });

    return { code: 200, data: { user: { id, email, role, username }, token } };
  }
}
