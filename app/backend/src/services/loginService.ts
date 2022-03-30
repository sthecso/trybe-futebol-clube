import * as bcrypt from 'bcrypt';
import jwt = require('jsonwebtoken');
import myJwt from '../utils/jwt';
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
    const token: string = await myJwt.generateToken(user);
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

  public getUser = async (token: string) => {
    const user = await myJwt.jwtVerify(token) as jwt.JwtPayload;
    const { email: userEmail } = user;
    const userByEmail = await this._UsersModel.findOne({
      where: { email: userEmail },
    });

    if (!userByEmail || userByEmail === null) {
      return new HttpException(401, 'Unauthorized user');
    }

    return userByEmail.role;
  };
}

export default new LoginService();
