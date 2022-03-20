import { IUser } from './User';

export interface IUserRepository {
  getUserByEmail(email: string): Promise<IUser | null>
}
