import User from '../database/models/User';
import { compareSync } from 'bcryptjs';
import { generateToken } from '../utils/jwt';

const login = async (emailParam: string, passwordParam: string) => {
  const result = await User.findOne({ where: { email: emailParam } });

  const user = result?.get();
  const { id, username, role, email, password } = user;
  
  const validPassword = user && compareSync(passwordParam, password);
  if (!validPassword) return null;

  if (user) {
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
  }
};

export default login;
