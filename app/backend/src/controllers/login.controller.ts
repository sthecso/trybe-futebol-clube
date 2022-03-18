import { ITokenData, ICredentials } from '../interfaces';
import { LoginService } from '../services';

export default class LoginController {
  constructor(
    private loginService: LoginService,
  ) {}

  async login(credentials: ICredentials) {
    return this.loginService.login(credentials);
  }

  validate(tokenData: ITokenData) {
    if (!this) { console.log('lint chato'); }
    return { code: 200, data: tokenData.role };
  }
}
