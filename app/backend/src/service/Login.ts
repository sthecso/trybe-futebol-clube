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
    this._userFound = await User.findOne({
      where: { email: this.email } });
    return this.userFound;
  }

  get userFound() {
    if (this._userFound) {
      const { id, username, role, email } = this._userFound;
      return { id, username, role, email };
    }
    return null;
  }
}

export default Login;

