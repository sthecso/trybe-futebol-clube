import APIError from '../helpers/APIError';
import User from '../database/models/User';
import jwtHelper from '../helpers/jwtHelper';
import ILogin from '../interfaces/ILogin';
import { compare } from '../helpers/bcryptHelper';
import IUser from '../interfaces/IUser';

class LoginService {
  private UserModel = User;

  private verifiedUser: IUser;

  async login(data: ILogin) {
    const user: IUser | null = await this.UserModel.findOne({
      where: { email: data.email },
      raw: true,
    });
    const error = new APIError('Incorrect email or password', 'unauthorized');

    if (!user) throw error;

    const userPassword = user.password as string;
    const isPasswordCorrect = await compare(data.password, userPassword);
    delete user.password;

    if (!isPasswordCorrect) {
      throw error;
    }

    const token = jwtHelper.sign(user);
    return {
      user,
      token,
    };
  }

  validate(token: string) {
    this.verifiedUser = jwtHelper.verify(token) as IUser;
    return this.verifiedUser.role;
  }
}

export default LoginService;
