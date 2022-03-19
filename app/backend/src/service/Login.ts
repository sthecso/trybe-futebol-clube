import User from '../database/models/users';

class Login {
  private readonly model: User;

  private email: string;

  private password: string;

  private _userFound: User | null;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async findUser() {
    const resultQuery = await User.findOne({
      where: { email: this.email } });
    this._userFound = resultQuery;
    return this.userFound;
  }

  get userFound() {
    return this._userFound;
  }
}

export default Login;
