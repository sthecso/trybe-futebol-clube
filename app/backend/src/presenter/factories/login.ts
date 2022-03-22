import LoginController from '../controllers/login';
import makeLoginAuthentication from './authentication';
import makeValidationComposite from './validationComposite';

const makeLoginController = () => new LoginController(
  makeValidationComposite(),
  makeLoginAuthentication(),
);

export default makeLoginController;
