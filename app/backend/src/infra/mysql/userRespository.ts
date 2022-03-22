import IUserAccount from '../../domain/interfaces/IUserAccount';
import IGetUserByEmailRepository from '../../data/interfaces/db/IGetUserByEmailRepository';
import { UserModel } from '../../database/models';

class UserRepository implements IGetUserByEmailRepository {
  async getByEmail(email: string): Promise<IUserAccount | null> {
    if (!this) console.log('');
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UserRepository;
