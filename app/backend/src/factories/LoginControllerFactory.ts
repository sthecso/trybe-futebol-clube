import UserValidation from '../validations';
import loginSchema from '../utils/joiSchemas';
import { LoginController } from '../controllers';
import { LoginService } from '../services';
import { Jwt } from '../utils';

const loginControllerFactory = (): LoginController => {
  const userValidation = new UserValidation(loginSchema);
  const jwt = new Jwt();
  const loginService = new LoginService(jwt);
  const loginController = new LoginController(userValidation, loginService);
  return loginController;
};

export default loginControllerFactory;
