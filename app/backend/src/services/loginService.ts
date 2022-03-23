import { compare } from 'bcryptjs';
import users from '../database/models/users';
import { ILogin } from '../interfaces/interfaces';

const bcryptUse = async (password: string, hash: string) => {
  const result = await compare(password, hash);
  return result;
};

const login = async (payload: ILogin) => {
  const user = await users.findOne({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    return ('oi');
  }
  const result = await bcryptUse(payload.password, user.password);
  return result;
};

export default { login };
