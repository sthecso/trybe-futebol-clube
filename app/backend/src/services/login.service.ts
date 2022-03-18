import User from '../database/models/User';

export default class LoginService {
  async login(data: any): Promise<any> {
    const user = await User.findOne({
      where: { email: data.email },
    });
    return user
  }
  async create(data: any): Promise<any> {
    const user = await User.findOne({
      where: { email: data.email },
    });
    return user
  }
}
