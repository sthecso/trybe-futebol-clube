import * as bcrypt from 'bcryptjs';
import User from '../database/models/UserModel';
import throwError from './error';

interface ILogin {
  email: string,
  password: string,
}

const verifyLogin = async (loginParams: ILogin) => {
  const { email, password: passwordBody } = loginParams;
  const userFound = await User.findOne({ where: { email } });
  if (!userFound) return throwError('Incorrect email or password', '401');
  const testBCrypt = bcrypt.compareSync(passwordBody, userFound.password);
  if (!testBCrypt) return throwError('Incorrect email or password', '401');
  return {
    id: userFound.id,
    username: userFound.username,
    role: userFound.role,
    email: userFound.email,
  };
};

export default verifyLogin;
