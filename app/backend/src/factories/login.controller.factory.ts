import { compare } from 'bcryptjs';
import { LoginService } from '../services';
import { LoginController } from '../controllers';
import { UsersRepository } from '../repositories';
import { jwtGenerator } from '../helpers';

export default (): LoginController => {
  const loginService = new LoginService(new UsersRepository(), compare, jwtGenerator);
  return new LoginController(loginService);
};
