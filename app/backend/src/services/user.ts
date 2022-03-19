import * as bcrypt from 'bcryptjs';
import helpjwt from '../utils/helpjwt';
import ModelUser from '../database/fé/user';

interface IuserDT0 {
  email:string,
  password:string
}
interface IUserWithPassDTO {
  id: number,
  username: string,
  role: string,
  email: string
  password?:string
}
interface IUserWithTokenDTO {
  user:IUserWithPassDTO,
  token:string
}
class User {
  private _ModelUser:ModelUser = new ModelUser();

  private _user:IUserWithPassDTO | null;

  private _verifyUser:IUserWithPassDTO;

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
