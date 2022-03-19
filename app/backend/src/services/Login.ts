import { IEmailAndPasswordDTO, LoginDTO } from '../interfaces/ILogin';
import User from '../database/models/User';

class LoginService implements IEmailAndPasswordDTO, LoginDTO {
  id: number;

  username: string;

  role: string;

  email: string;

  password: string;

  userReturnOnlogin = async (email: string) => {
    const attributesUser = await User.findAll() as LoginDTO[];
    const filteringEmailUser = attributesUser.filter((e) => e.email === email);
    const recoverAttributesUserLogged = filteringEmailUser.map((a) => {
      const { id, username, role } = a;
      return {
        id,
        username,
        role,
      };
    });
    return recoverAttributesUserLogged;
  };

  getLogin = async (value: IEmailAndPasswordDTO) => {
    const { email, password } = value;
    const searchUser = await User.findOne({ where: { email, password } }) as User;

    if (!searchUser) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    if (password !== searchUser.password) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    const userLogged = await this.userReturnOnlogin(email);

    return { code: 200,
      data: {
        id: String(userLogged[0].id),
        username: userLogged[0].username,
        role: userLogged[0].role,
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
