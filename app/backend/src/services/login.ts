import { User } from '../database/models';
import { createToken } from '../auth';
// import HttpException from '../classes/httpException';

export const login = async (user: User) => {
  const token = createToken(user);
  return { user, token };
};

export const validate = async (user: User) => {
  console.log('user', user);
  return user;
};
