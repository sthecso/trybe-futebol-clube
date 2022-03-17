import bcrypt = require('bcryptjs');
import { createError, generateToken } from '../utils';
import UserModel from '../database/models/User';
import { IUserDTO, IUserDTOwithToken } from '../interfaces/IUserDTO';

export default class LoginService {
  userModel = UserModel;

  private async getByEmail(email: string): Promise<IUserDTO> {
    const result = await this.userModel.findOne({ where: { email }, raw: true });

    return result as unknown as IUserDTO;
  }

  public async login(email: string, password: string): Promise<IUserDTOwithToken> {
    const result = await this.getByEmail(email);

    if (!await bcrypt.compare(password, result.password)) {
      throw createError('unauthorized', 'Incorrect email or password');
    }

    const { role, id, username } = result;

    const token = generateToken({ role });

    return {
      user: {
        id,
        username,
        role,
        email,
      },
      token,
    };
  }
}
