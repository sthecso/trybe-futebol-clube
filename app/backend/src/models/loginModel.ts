import User from '../database/models/Users';

class LoginModel {
  private _User = User;

  public async loginModel(email: string) {
    const user = await this._User.findOne({ where: { email }, raw: true });
    return user;
  }
}

export default new LoginModel();
