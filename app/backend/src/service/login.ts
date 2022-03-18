import User from '../database/models/UserModel';
import throwError from './error';

interface ILogin {
  email: string,
  password: string,
}

const verifyLogin = async (loginParams: ILogin) => {
  const { email, password } = loginParams;
  const userFound = await User.findOne({ where: { email } });
  if (!userFound) return throwError('Incorrect email or password', '401');
  const passFound = userFound?.getDataValue('password');
  if (password !== passFound) return throwError('Incorrect email or password', '401');
  if (userFound) {
    return {
      id: userFound.id,
      username: userFound.username,
      role: userFound.role,
      email: userFound.email,
    };
  }
};

export default verifyLogin;
