import LoginService from '../services/LoginService';
import UserValidation from '../validations';
import { IUserDTOwithToken, LoginBody } from '../interfaces/IUserDTO';

export default class LoginController {
  constructor(
    private userValidator: UserValidation,
    private loginService: LoginService,
  ) {}

  async handle(body: LoginBody): Promise<IUserDTOwithToken> {
    await this.userValidator.bodyLogin(body);
    const { email, password } = body;

    const result = await this.loginService.login(email, password);

    return result as IUserDTOwithToken;
  }
}
