import ModelUser from '../database/fé/user';

interface IuserDT0 {
  email:string,
  password:string
}
class User {
  private _ModelUser:ModelUser = new ModelUser();

  async getByEmail({ email, password }:IuserDT0) {
    const user = await this._ModelUser.getByEmail(email);
    console.log(password);
    return user;
  }
}
export default User;
