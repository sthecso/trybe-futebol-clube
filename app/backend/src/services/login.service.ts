import jwt from '../utils/jwt';
import ICredentials from '../controllers/interface/Credentials.interface';
import User from '../database/models/User';
import Bcrypt from '../utils/bcryptjs';

export default class LoginService {
  async create(data: ICredentials): Promise<any> {
    const dataUser = await User.findOne({
      where: { email: data.email },
    });
    if (!dataUser) {
      const error = {
        code: 401,
        message: "Incorrect email or password",
      };
      return error;
    }
    const bcrypt = new Bcrypt(data.password, dataUser.password);
    const test = await bcrypt.decrypt()
    if (!test) {
      const error = {
        code: 401,
        message: "Incorrect email or password",
      };
      return error;
    }
    const { id, username, role, email } = dataUser;
    const user = { id, username, role, email }
    const token = jwt.sign({ id, username, role, email });
    return { user, token };
  }
}
