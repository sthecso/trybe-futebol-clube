import { compare } from 'bcryptjs';
import { ILogin } from '../interfaces';
import { UserModel } from '../database/models';
import { signToken } from '../auth';
import StatusCode from '../enums';

class LoginService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async login(login: ILogin) {
    const user = await this.userModel.findOne({
      where: { email: login.email },
    });

    if (!user || !(await compare(login.password, user.password))) {
      return { code: StatusCode.UNAUTHORIZED, data: { message: 'Incorrect email or password' } };
    }

    const { id, email, role, username } = user;

    const token = signToken({ id, email, role, username });

    return { code: StatusCode.OK, data: { user: { id, email, role, username }, token } };
  }

  async validate(userId: number) {
    const user = await this.userModel.findOne({
      where: { id: userId },
    });
    if (!user) {
      return { code: StatusCode.UNAUTHORIZED, data: { error: 'Invalid token' } };
    }

    const { role } = user;

    return { code: StatusCode.OK, data: role };
  }
}

export default LoginService;
