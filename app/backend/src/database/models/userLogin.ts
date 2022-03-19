import bcrypt = require('bcryptjs');
/* import { GenerateStatusError, statusCode } from '../utils/index'; */
import IUserReq from '../interfaces/login/IUserReq';

import User from '../modelsSequelize/user';

class LoginUserModel {
  private userModel = User;

  /* private ErrorStatus = GenerateStatusError; */

  /* private StatusCode = statusCode; */

  async findUser({ email, password }: IUserReq) {
    const user = await this.userModel.findOne({ where: { email, password } });

    if (!user) return null;

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) return null;

    return {
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    };
  }
}

export default LoginUserModel;
