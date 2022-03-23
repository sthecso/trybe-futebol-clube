export interface Id {
  id: number;
}

export interface IUser extends Id {
  username: string,
  role: string,
  email: string,
}

export interface ILogin {
  email: string,
  password: string,
}
