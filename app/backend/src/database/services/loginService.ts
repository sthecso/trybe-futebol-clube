import * as jwt from 'jsonwebtoken';
import key from '../../utils/readKeyJWT';
import { Ilogin } from '../../utils/interfaces';
import User from '../models/User';

const userLoginService = async (loginParams: Ilogin) => {
  const { email, password } = loginParams;
  const users = await User.findOne({ where: { email } });

  if (!users) {
    return { code: 401, message: 'Incorrect email or password' };
  }

  if (password !== users.password) {
    return { code: 401, message: 'Incorrect email or password' };
  }
  const token = jwt.sign({ id: users.id }, key);

  return {
    user: {
      id: users.id,
      username: users.username,
      role: users.role,
      email: users.email,
    },
    token,
  };
};

export default userLoginService;
