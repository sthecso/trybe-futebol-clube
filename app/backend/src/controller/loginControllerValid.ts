import LoginValidate from '../services/loginValidate';

export default class ControllerLoginValidate {
  public static async getId(id:number) {
    return LoginValidate.validateLogin(id);
  }
}
