import { ICredentials } from '../User/Credentials';

interface ILoginResponse {
  code: number;
  data: {
    message: string;
    user?: undefined;
    token?: undefined;
  } | {
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
  login(credentials: ICredentials): Promise<ILoginResponse>
}
