import * as jwt from 'jsonwebtoken';
import { hash, compare } from '../../utils/hash';
import key from '../../utils/readKeyJWT';
import { Ilogin } from '../../utils/interfaces';
import User from '../models/User';

const userLoginService = async (loginParams: Ilogin) => {
  const { email, password } = loginParams;
  const users = await User.findOne({ where: { email } });

  if (!users) { return { code: 401, message: 'Incorrect email or password' }; }

  const passHash = await hash(password);
  console.log(passHash);

  const verifyPass = await compare(passHash, users.password);
  if (verifyPass) { return { code: 401, message: 'Incorrect email or password' }; }

  const token = jwt.sign({ id: users.id }, key);
  const { id, username, role } = users;
  return {
    user: { id, username, role, email }, token,
  };
};

export default userLoginService;
