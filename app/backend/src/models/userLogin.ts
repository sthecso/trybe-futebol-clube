import bcrypt = require('bcryptjs');
import IUserReq from '../interfaces/login/IUserReq';
import User from '../database/modelsSequelize/user';

class LoginUserModel {
  userModel = User;

  public async findUser({ password, email }: IUserReq) {
    const user = await this.userModel.findOne({ where: { email }, raw: true });

    if (!user) return null;

    const verifypassword = bcrypt.compareSync(password, user.password);

    if (!verifypassword) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,

    };
  }
}

export default LoginUserModel;
