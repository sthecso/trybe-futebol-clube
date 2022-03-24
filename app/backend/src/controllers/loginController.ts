import { ILogin } from '../interfaces/login';
import LoginService from '../services/loginService';

export default class LoginController {
  public static async login(login: ILogin) {
    return LoginService.login(login);
  }
}
