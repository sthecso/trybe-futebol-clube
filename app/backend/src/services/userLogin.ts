import IUserReq from '../interfaces/login/IUserReq';

import LoginUserModel from '../models/userLogin';

class LoginUserService {
  private loginModel = new LoginUserModel();

  constructor() {
    this.findUser = this.findUser.bind(this);
  }

  async findUser(loginData: IUserReq) {
    const user = await this.loginModel.findUser(loginData);
    return user;
  }
}

export default LoginUserService;
