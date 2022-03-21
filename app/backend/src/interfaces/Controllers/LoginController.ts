import { ILoginService } from '../Services/LoginService';
import { ITokenData } from '../User/TokenData';

export interface ILoginController extends ILoginService {
  validate(tokenData: ITokenData): { code: number, data: string }
}
