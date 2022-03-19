import jwt from '../utils/jwt';
import ICredentials from '../controllers/interface/Credentials.interface';
import User from '../database/models/User';
import Bcrypt from '../utils/bcryptjs';

export default class LoginService {
  async login(data: ICredentials): Promise<any> {
    const user = await User.findOne({
      where: { email: data.email },
    });
    return user
  }
  async create(data: ICredentials): Promise<any> {
    const { email, password } = data;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user) {
      const error = {
        code: 401,
        message: "Incorrect email or password",
      };
      return error;
    }
    const bcrypt = new Bcrypt(password, user.password);
    const test = await bcrypt.decrypt()
    if (!test) {
      console.log("entrou ")
      const error = {
        code: 401,
        message: "Incorrect email or password",
      };
      return error;
    }
    const { id } = user;
    const token = jwt.sign({ email, id });
    return { user, token };
  }
}
