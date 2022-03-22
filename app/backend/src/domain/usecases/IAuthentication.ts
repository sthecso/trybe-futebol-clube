import IAccessToken from '../interfaces/IAccessToken';
import IUserAccount from '../interfaces/IUserAccount';

export type AuthParams = {
  email: string
  password: string
};

export type AuthResult = {
  user: IUserAccount
  token: IAccessToken
};

interface IAuthentication {
  auth(params: AuthParams): Promise<AuthResult | null>
}

export default IAuthentication;
