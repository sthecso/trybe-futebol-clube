import { ILogin } from '../../interfaces';
import User from '../../database/models/User';
import { jwt } from '../../utils';

export default class Login {
  constructor(
    private user = User,
  ) {}

  async login(login: ILogin) {
    const account = await this.user.findOne({
      where: { email: login.email, password: login.password },
      attributes: ['id', 'username', 'role', 'email'],
      raw: true,
    });

    if (!account) return { message: 'Incorrect email or password', code: 401 };

    const token = jwt.signToken(account);

    return { code: 200, payload: { account, token } };
  }
}
