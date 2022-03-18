/* import bcrypt = require('bcryptjs'); */
import { GenerateStatusError } from '../utils';
import generateToken from '../utils/generateToken';
import IUserReq from '../interfaces/login/IUserReq';

import LoginUserModel from '../models/userLogin';

class LoginUserService {
  private loginModel = new LoginUserModel();

  private token = generateToken;

  async findUser(loginData: IUserReq) {
    const user = await this.loginModel.findUser(loginData);

    if (user instanceof GenerateStatusError) {
      return user;
    }

    const token = this.token(user.data);
    return {
      user: user.data,
      token,
    };
  }
}

export default LoginUserService;
