export interface IUserLogin {
  email: string;
  password: string;
}

export interface IErrorStatus {
  [key:string]: number;
}

export interface IJwtPayload {
  role: string;
  iat?: number;
}
