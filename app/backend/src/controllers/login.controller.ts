import { ITokenData, ICredentials, ILoginService, ILoginController } from '../interfaces';

export default class LoginController implements ILoginController {
  constructor(
    private loginService: ILoginService,
  ) {}

  async login(credentials: ICredentials) {
    return this.loginService.login(credentials);
  }

  validate(tokenData: ITokenData) {
    if (!this) { console.log('lint chato'); }
    return { code: 200, data: tokenData.role };
  }
}
