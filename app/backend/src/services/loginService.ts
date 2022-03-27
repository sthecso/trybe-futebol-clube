import generateToken from '../utils/generateToken';
import Users from '../database/models/Users';

class LoginService {
  private _UsersModel = Users;

  public login = async (emailReceived: string, _password: string) => {
    const user = await this._UsersModel.findOne({
      where: { email: emailReceived },
    });

    if (!user) {
      throw new Error('user not exists');
    }

    const token = await generateToken(user);
    console.log(token);

    const data = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
    return data;
  };
}

export default new LoginService();
