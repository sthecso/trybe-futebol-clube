import { IUser } from '../User/User';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUser | null>
}
