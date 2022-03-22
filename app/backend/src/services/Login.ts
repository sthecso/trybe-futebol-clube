import { CRUDLogin } from '../interfaces/CRUD';
import { IEmailAndPasswordDTO, LoginDTO } from '../interfaces/ILogin';
import User from '../database/models/User';
import { hash, compare } from '../utils/Bcrypt';

class LoginService implements CRUDLogin {
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

  checkIfPasswordTrueOrFalse = async (password: string, user: string) => {
    const hashPassword = await hash(password);

    const comparePassword = await compare(hashPassword, user);

    return comparePassword;
  };

  getLogin = async (value: IEmailAndPasswordDTO) => {
    const { email, password } = value;
    const searchUser = await User.findOne({ where: { email } }) as User;

    if (!searchUser || searchUser === undefined) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const comparePassword = await this.checkIfPasswordTrueOrFalse(password, searchUser.password);

    if (comparePassword) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const userLogged = await this.userReturnOnlogin(email);

    return { code: 200,
      data: {
        id: userLogged[0].id,
        username: userLogged[0].username,
        role: userLogged[0].role,
        email: searchUser.email,
        password,
      } };
  };

  getUser = async () => {
    const getUser = await User.findAll();
    return { code: 200, data: getUser[0] };
  };
}

export default new LoginService();
