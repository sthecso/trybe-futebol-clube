export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IUserComplete extends IUser {
  password: string;
}
