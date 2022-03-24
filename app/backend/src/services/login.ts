import { compareSync } from 'bcryptjs';
import { User } from '../database/models';
import { ILogin } from '../utils/interfaces';
import { createToken } from '../auth';
import HttpException from '../classes/httpException';

export const login = async (loginData: ILogin) => {
  const { email, password } = loginData;
  if (!email || !password) throw new HttpException(401, 'All fields must be filled');
  const user = await User.findOne({ where: { email } });
  if (!user) throw new HttpException(401, 'Incorrect email or password');
  if (!compareSync(password, user.password)) {
    throw new HttpException(401, 'Incorrect email or password');
  }
  const { password: notUse, ...userData } = user;
  const token = createToken(user);
  return { user: userData, token };
};

export const validate = async ({ email }: ILogin) => User
  .findOne({ where: { email } })
  .then((user) => user as User);
