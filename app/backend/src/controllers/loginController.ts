import LoginService from '../services/loginService';

export default class LoginController {
  public static async login(email:string, password: string) {
    return LoginService.login(email, password);
  }
}
