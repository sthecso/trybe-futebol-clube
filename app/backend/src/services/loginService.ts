import { ILogin } from '../interfaces/interfaces';
import users from '../database/models/users';

const login = (payload: ILogin) => {
  const user = users.findOne({
    where: {
      email: payload.email,
      password: payload.password,
    },
  });
  return user;
};

export default { login };
