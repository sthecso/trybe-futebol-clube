import LoginService from '../services';

class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }
}

export default LoginController;
