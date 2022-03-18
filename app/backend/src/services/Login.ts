import LoginRegisted from '../interfaces/ILogin';
import User from '../database/models/User';

class LoginService {
  private ILogin: LoginRegisted;

  create = async (value: LoginRegisted) => {
    const createUser = await User.create(value);
    return { code: 200, data: createUser };
  };
}

export default new LoginService();
