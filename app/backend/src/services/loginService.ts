import * as bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
import Users from '../database/models/Users';
import HttpException from '../utils/HttpException';
import { IUserModel } from '../interfaces/IUser';

class LoginService {
  private _UsersModel = Users;

  private ERROR_INCORRECT: HttpException = new HttpException(401, 'Incorrect email or password');

  private checkPassword = async (password: string, passwordEncrypted: string): Promise<boolean> => {
    const compare: boolean = await bcrypt.compare(password, passwordEncrypted);
    return compare;
  };

  public login = async (emailReceived: string, password: string) => {
    const user: IUserModel | null = await this._UsersModel.findOne({
      where: { email: emailReceived },
    });
    if (!user) throw this.ERROR_INCORRECT;
    const checkingPassword: boolean = await this.checkPassword(password, user.password);
    if (!checkingPassword) throw this.ERROR_INCORRECT;
    const token: string = await generateToken(user);
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
