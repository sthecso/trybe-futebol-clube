import IUserResponse from './IUserResponse';

interface ILoginResponse {
  user: IUserResponse;
  token: string;
}

export default ILoginResponse;
