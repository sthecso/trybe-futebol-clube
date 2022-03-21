import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import { generateToken } from '../utils/jwt';

const login = async (emailParam: string, passwordParam: string) => {
  const user = await User.findOne({ where: { email: emailParam } });

  if (!user) return null;

  const { id, username, role, email, password } = user;

  const validPassword = user && compareSync(passwordParam, password);
  if (!validPassword) return null;

  const token = generateToken({ role });
  return {
    user: {
      id,
      username,
      role,
      email,
    },
    token,
  };
};

export default login;
