import { UserModel } from '../database/models';

class LoginService {
  private userModel: typeof UserModel;

  constructor() {
    this.userModel = UserModel;
  }
}

export default LoginService;
