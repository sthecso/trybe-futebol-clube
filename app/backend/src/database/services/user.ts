import { Login } from '../interfaces/login';
import User from '../models/user';

const getUser = async (login: Login) => {
  const user = await User.findOne(
    { where: { email: login.email, password: login.password }, attributes: ['password'] },
  );
  if (user === null) return null;
  return user;
};

export default { getUser };
