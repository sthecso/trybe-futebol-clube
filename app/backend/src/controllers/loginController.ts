import { verifyToken } from '../utils';
import LoginService from '../services/LoginService';
import UserValidation from '../validations';
import { IUserDTOwithToken, LoginBody } from '../interfaces/IUserDTO';

export default class LoginController {
  readonly verifyToken = verifyToken;

  constructor(
    private userValidator: UserValidation,
    private loginService: LoginService,
  ) {}

  public async handle(body: LoginBody): Promise<IUserDTOwithToken> {
    await this.userValidator.bodyLogin(body);
    const { email, password } = body;

    const result = await this.loginService.login(email, password);

    return result as IUserDTOwithToken;
  }

  public validate(token: string): Promise<string> {
    const { role } = this.verifyToken(token);
    return role;
  }
}
