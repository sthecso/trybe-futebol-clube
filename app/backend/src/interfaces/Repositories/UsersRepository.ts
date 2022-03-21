import { IUser } from '../User/User';

export interface IUsersRepository {
  getUserByEmail(email: string): Promise<IUser | null>
}
