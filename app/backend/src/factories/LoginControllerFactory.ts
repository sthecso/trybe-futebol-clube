import UserValidation from '../validations';
import loginSchema from '../utils/joiSchemas';
import { LoginController } from '../controllers';
import { LoginService } from '../services';

const loginControllerFactory = (): LoginController => {
  const userValidation = new UserValidation(loginSchema);
  const loginService = new LoginService();
  const loginController = new LoginController(userValidation, loginService);
  return loginController;
};

export default loginControllerFactory;
