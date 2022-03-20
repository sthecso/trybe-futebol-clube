import { ILogin } from '../../interfaces';
import User from '../../database/models/User';
import { jwt } from '../../utils';

export default class Login {
  constructor(
    private user = User,
  ) {}

  async login(login: ILogin) {
    const user = await this.user.findOne({
      where: { email: login.email },
      attributes: ['id', 'username', 'role', 'email'],
      raw: true,
    });

    if (!user) return { message: 'Incorrect email or password', code: 401 };

    const token = jwt.signToken(user);

    return { code: 200, payload: { user, token } };
  }
}
