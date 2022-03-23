import LoginValidate from '../services/loginValidate';
// cria classe controller para validar
export default class ControllerLoginValidate {
  // usa POO para criar getId para pegar o id no validadeLogin no service
  public static async getId(id:number) {
    return LoginValidate.validateLogin(id);
  }
}
