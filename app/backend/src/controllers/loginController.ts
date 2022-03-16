import UserValidation from '../validations';
import IUserDTO from '../interfaces';

export default class LoginController {
  constructor(
    private userValidator: UserValidation,
  ) {}

  async handle(body: IUserDTO): Promise<string> {
    await this.userValidator.bodyLogin(body);

    return 'jububa';
  }
}
