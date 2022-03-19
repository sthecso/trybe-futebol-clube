import User from '../database/models/User';
import { IUser } from '../utils/interfaces';

class UserRepository {
  public static async findById(id: IUser['id']): Promise<IUser> {
    const result = await User.findByPk(id, { raw: true });
    return result as unknown as IUser;
  }

  public static async findByEmail(email: IUser['email']) {
    const result = await User.findOne({ where: { email }, raw: true });
    return result as unknown as User;
  }
}

export default UserRepository;
