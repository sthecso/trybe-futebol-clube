import { IUser } from './User';

export interface ILoginResult {
  user: IUser,
  token: string,
}

export interface ILogin {
  email: string;
  password: string;
}
