import Users from '../models/users';

class User {
  private metodos = Users;

  // constructor() {

  // }

  async getByEmail(email:string):Promise<string> {
    const user = await this.metodos.findOne({ where: { email } });
    console.log(user);
    return user as unknown as string;
  }
}
export default User;
