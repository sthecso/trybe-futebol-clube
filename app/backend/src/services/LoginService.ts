import { compare } from 'bcryptjs';
import { ILogin } from '../interfaces';
import { UserModel } from '../database/models';
import tokenGenerator from '../auth';

class LoginService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }

  async login(login: ILogin) {
    const user = await this.userModel.findOne({
      where: { email: login.email },
    });

    console.log(user);

    if (!user) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    console.log(!(await compare(login.password, user.password)));

    if (!user || !(await compare(login.password, user.password))) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const { id, email, role, username } = user;

    const token = tokenGenerator({ id, email, role, username });

    return { code: 200, data: { user: { id, email, role, username }, token } };
  }
}

export default LoginService;
