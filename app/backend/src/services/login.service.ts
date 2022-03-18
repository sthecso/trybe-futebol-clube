import { ICredentials, ITokenData } from '../interfaces';
import UsersRepository from '../repositories/users.repository';

export default class LoginService {
  constructor(
    private usersRepository: typeof UsersRepository,
    private compare: (p1: string, p2: string) => Promise<boolean>,
    private jwtGenerator: (param: ITokenData) => string,
  ) {}

  async login(credentials: ICredentials) {
    const user = await this.usersRepository.getUserByEmail(credentials.email);

    if (!user || !(await this.compare(credentials.password, user.password))) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }

    const { id, email, role, username } = user;

    const token = this.jwtGenerator({ id, email, role, username });

    return { code: 200, data: { user: { id, email, role, username }, token } };
  }
}
