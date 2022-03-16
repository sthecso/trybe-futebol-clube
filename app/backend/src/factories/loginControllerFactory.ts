import UserValidation from '../validations';
import LoginController from '../controllers';
import loginSchema from '../utils/joiSchemas';

// import { UserService } from '../services';

const loginControllerFactory = (): LoginController => {
  const userValidation = new UserValidation(loginSchema);
  // const userService = new UserService();
  const loginController = new LoginController(userValidation);
  return loginController;
};

export default loginControllerFactory;
