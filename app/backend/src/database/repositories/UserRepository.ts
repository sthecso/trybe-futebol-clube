import { WhereOptions } from 'sequelize';

import User from '../models/User';

import { IUser } from '../../interfaces/login';

class UserRepository {
  private User = User;

  async findOne({ where }: { where: WhereOptions<IUser> }) {
    const user = await this.User.findOne({ where });

    const justDataValuesOfUser = user?.get({ plain: true });

    return justDataValuesOfUser;
  }
}

export default UserRepository;
