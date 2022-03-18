export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
