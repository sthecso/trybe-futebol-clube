import * as bcryptsjs from 'bcryptjs';
import generateKey from '../utils/generateToken';
import User from '../models/loginModel';

class LoginService {
  private _UserModel = User;

  static lib = bcryptsjs;

  static _hash: boolean;

  public static convertPassword(password: string, passwordDb: string) {
    this._hash = this.lib.compareSync(password, passwordDb);
    return this._hash;
  }

  public async loginService(email: string, password: string) {
    const user = await this._UserModel.loginModel(email);
    if (!user) return { message: 'Incorrect email or password', code: 401 }
    const hash = LoginService.convertPassword(password, user.password);
    if (!hash) return { message: 'Incorrect email or password', code: 401 }
    const token = await generateKey(user);
    
    const result = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email
      },
      token,
    }

    return result;
  }
}

export default new LoginService();
