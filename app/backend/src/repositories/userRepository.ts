import { UsersModel } from '../database/models';
import { IUser } from '../interfaces';

export default class UserRepository {
  public static async findByEmail(email: string): Promise<IUser | null> {
    const result = UsersModel.findOne({
      where: { email },
    });

    return result;
  }
}
