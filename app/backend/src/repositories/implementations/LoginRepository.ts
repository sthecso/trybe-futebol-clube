import User from '../../database/models/user';
import { ILoginRepository } from '../ILoginRepository';

export default class LoginRepository implements ILoginRepository {
  private user = User;

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.user.findOne({ where: { email } });

    return result;
  }
}
