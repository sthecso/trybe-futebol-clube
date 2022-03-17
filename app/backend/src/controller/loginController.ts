import ServiceLogin from '../services/loginService';

export default class ControllerLogin {
  public static async getUser(email:string, password: string) {
    return ServiceLogin.login(email, password);
  }
}
