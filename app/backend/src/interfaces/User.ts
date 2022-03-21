export interface IUser {
  id: number;
  email: string;
  password?: string;
  username: string;
  role: string;
}

export interface IUserResponseDB {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}
