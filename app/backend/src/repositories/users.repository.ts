import { IUser, IUsersRepository } from '../interfaces';
import { UserModel } from '../database/models';

export class UsersRepository implements IUsersRepository {
  async getUserByEmail(email: string): Promise<IUser | null> {
    return (await UserModel.findOne({
      where: { email },
    }))
      ?.get({ plain: true });
  }
}
