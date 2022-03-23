import * as jwt from 'jsonwebtoken';
import { compare } from '../utils/hash';
import key from '../utils/readKeyJWT';
import { Ilogin } from '../utils/interfaces';
import User from '../database/models/User';

const userLoginService = async (loginParams: Ilogin) => {
  const { email, password } = loginParams;
  const users = await User.findOne({ where: { email } });

  if (!users) { return { code: 401, message: 'Incorrect email or password' }; }

  const verifyPass = await compare(password, users.password);
  if (!verifyPass) { return { code: 401, message: 'Incorrect email or password' }; }

  const token = jwt.sign({ id: users.id }, key);
  const { id, username, role } = users;
  return {
    user: { id, username, role, email }, token,
  };
};

export default userLoginService;
