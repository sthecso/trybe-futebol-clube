import LoginService from '../services/login.service'
import ICredentials from './interface/Credentials.interface';

const loginService = new LoginService();

export default class LoginController {
  // public path: string = '/login';.

  public async create(data: ICredentials): Promise<any> {
    const result = await loginService.create(data)

    return result
  }
}
