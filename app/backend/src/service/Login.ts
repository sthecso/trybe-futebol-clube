import User from '../database/models/users';

class Login {
  private readonly model: User;

  private email: string;

  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async findEmail() {
    const resultQuery = await User.findOne({
      where: { email: this.email }, attributes: { exclude: ['password'] } });
    return resultQuery;
  }
}

export default Login;
