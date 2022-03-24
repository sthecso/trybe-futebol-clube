import { compare } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { UsersModel } from '../database/models';
import { ErrorHandle, IUserResponseDB } from '../interfaces';

export default class UserRepository {
  public static async findByEmail(email: string): Promise<IUserResponseDB | null> {
    const result = UsersModel.findOne({
      where: { email },
    });

    return result;
  }

  public static async comparePassword(password: string, hash: string) {
    const result = await compare(password, hash);

    if (!result) {
      throw new ErrorHandle(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
  }
}
