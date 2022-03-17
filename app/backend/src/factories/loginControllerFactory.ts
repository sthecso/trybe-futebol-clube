import LoginService from '../services';
import UserValidation from '../validations';
import LoginController from '../controllers';
import loginSchema from '../utils/joiSchemas';

const loginControllerFactory = (): LoginController => {
  const userValidation = new UserValidation(loginSchema);
  const loginService = new LoginService();
  const loginController = new LoginController(userValidation, loginService);
  return loginController;
};

export default loginControllerFactory;
