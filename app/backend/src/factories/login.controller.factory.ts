// export const userControllerFactory = (): UserController => {
//   const userValidation = new UserValidation()
//   const userService = new UserService()
//   const userController = new UserController(userValidation, userService)
//   return userController
// }

import { compare } from 'bcryptjs';
import { LoginService } from '../services';
import { LoginController } from '../controllers';
import UsersRepository from '../repositories/users.repository';
import { jwtGenerator } from '../helpers';

export const loginControllerFactory = (): LoginController => {
  const loginService = new LoginService(UsersRepository, compare, jwtGenerator);
  return new LoginController(loginService);
};

export const lint = 'chato';
