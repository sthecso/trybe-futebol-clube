import IUserAccount from '../../../../domain/interfaces/IUserAccount';
import IAccessToken from '../../../../domain/interfaces/IAccessToken';
import IHttpResponse from '../../../interfaces/IHttpResponse';

export interface ILoginResponse {
  user: IUserAccount;
  token: IAccessToken;
}

const ok = (data: ILoginResponse): IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export default ok;
