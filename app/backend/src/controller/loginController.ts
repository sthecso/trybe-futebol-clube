import ServiceLogin from '../services/loginService';

export default class ControllerLogin {
  public static getUser(email:string, password: string) {
    ServiceLogin.login(email, password);
  }
}
