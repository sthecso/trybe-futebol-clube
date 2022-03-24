import { compareSync } from 'bcryptjs';
import { User } from '../database/models';
import { ILogin } from '../utils/interfaces';
import { createToken } from '../auth';
import HttpException from '../classes/httpException';

export const login = async (loginData: ILogin) => {
  const { email, password } = loginData;
  if (!email || !password) throw new HttpException(401, 'All fields must be filled');
  const userData = await User.findOne({ where: { email } });
  if (!userData) throw new HttpException(401, 'Incorrect email or password');
  if (!compareSync(password, userData.password)) {
    throw new HttpException(401, 'Incorrect email or password');
  }
  const { id } = userData;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } }) as User;
  const token = createToken(user);
  return { user, token };
};

export const validate = async ({ email }: ILogin) => User
  .findOne({ where: { email } })
  .then((user) => user as User);
