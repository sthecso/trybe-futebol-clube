import User from '../database/models/User';
import { IUser } from '../interface/User';

export default class LoginValidate {
  // cria classe para validar login
  public static async validateLogin(id:number) {
    // busca o email do usuario no banco pega o role usando a interface e o retorna
    const user = await User.findOne({ where: { id } });
    const { role } = user as IUser;
    return role;
  }
}
