import { ICredential, ILoginService, IUserRepository } from '../utils/interfaces';
import { sign } from '../utils/jwt';

export default class LoginService implements ILoginService {
  constructor(
    private userRepository: IUserRepository,
    private compare: (plain: string, hash: string) => Promise<boolean>,
  ) {}

  public async login(credentials: ICredential) {
    const user = await this.userRepository.getByEmail(credentials.email);

    if (!user || !(await this.compare(credentials.password, user.password))) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const token = sign(user);

    return { code: 200, data: { user, token } };
  }
}
