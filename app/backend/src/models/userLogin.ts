import IUserReq from '../interfaces/login/IUserReq';

import User from '../database/modelsSequelize/user';

class LoginUserModel {
  private userModel = User;

  async findUser({ email, password }: IUserReq) {
    const user = await this.userModel.findOne({ where: { email, password } });

    if (user === null) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }
}

export default LoginUserModel;
