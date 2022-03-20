import * as bcrypt from 'bcryptjs';
import helpjwt from '../utils/helpjwt';
import ModelUser from '../database/fé/user';
import { IuserDT0, IUserWithIdDTO, IUserWithTokenDTO } from '../interface/user';

class User {
  private _ModelUser:ModelUser = new ModelUser();

  private _user:IUserWithIdDTO | null;

  private _verifyUser:IUserWithIdDTO;

  private _token:string;

  private _userWithToken:IUserWithTokenDTO;

  async validLogin(password:string) {
    if (!this._user) throw new Error('Incorrect email or password/Unauthorized');
    if (this._user.password) {
      const teste = await bcrypt.compare(password, this._user.password);
      if (!teste) throw new Error('Incorrect email or password/Unauthorized');
    }
    this._verifyUser = this._user;
  }

  async clear() {
    const { password, ...outros } = this._verifyUser;
    this._token = helpjwt.sign(outros);
    this._userWithToken = { user: outros, token: this._token };
  }

  async getByEmail({ email, password }:IuserDT0) {
    this._user = await this._ModelUser.getByEmail(email);
    await this.validLogin(password);
    await this.clear(); // alterar nome
    return this._userWithToken;
  }
}
export default User;
