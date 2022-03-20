import { ILoginService } from './LoginService';
import { ITokenData } from './TokenData';

export interface ILoginController extends ILoginService {
  validate(tokenData: ITokenData): { code: number, data: string }
}
