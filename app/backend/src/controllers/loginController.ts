import { ILogin, ILoginResult } from '../interfaces';
import { loginSchema } from '../schemas';
import { LoginService } from '../services';

export default class LoginController {
  public static async login(login: ILogin): Promise<ILoginResult> {
    loginSchema.parse(login);

    const result = LoginService.login(login);

    return result;
  }
}
