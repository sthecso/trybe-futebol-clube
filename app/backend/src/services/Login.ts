import { IEmailAndPasswordDTO, LoginDTO } from '../interfaces/ILogin';
import User from '../database/models/User';

class LoginService implements IEmailAndPasswordDTO, LoginDTO {
  username: string;

  role: string;

  email: string;

  password: string;

  getLogin = async (value: IEmailAndPasswordDTO) => {
    const { email, password } = value;
    const searchUser = await User.findOne({ where: { email, password } });

    if (!searchUser) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    if (password !== searchUser.password) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const atributtesUser = await User.findAll() as LoginDTO[];
    return { code: 200,
      data: {
        username: atributtesUser[0].username,
        role: atributtesUser[0].role,
        email: searchUser.email,
        password: searchUser.password,

      } };
  };

  getUser = async () => {
    const getUser = await User.findAll();
    return { code: 200, data: getUser[0] };
  };
}

export default new LoginService();
