export interface IPayload {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ICredential {
  email: string;
  password: string;
}

export interface IToken {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRepository {
  getByEmail(email: string): Promise<IUser | null>
}

export interface ILoginResponse {
  code: number;
  data:
  {
    message: string;
    user?: undefined;
    token?: undefined;
  }
  |
  {
    user: {
      id: number;
      email: string;
      role: string;
      username: string;
    };
    token: string;
    message?: undefined;
  };
}

export interface ILoginService {
  login(credentials: ICredential): Promise<ILoginResponse>
}
