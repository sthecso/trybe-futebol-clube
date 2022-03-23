import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import { IUser } from '../interface/User';
import { createJwt } from '../jwt/authJWT';

export default class ServiceLogin {
  public static async login(email:string, password:string) {
    // busca email do banco
    const user = await User.findOne({ where: { email } });
    // condicionais se nao tiver email do usuario
    if (!user) {
      throw new Error('Incorrect email or password');
    }
    // para carregar a hash do seu banco de dados de senha
    const comparePassword = await bcrypt.compare(password, user.password);
    
    if (!comparePassword) {
      throw new Error('Incorrect email or password');
    }

    const payload: IUser = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password
    };
    
    const token = createJwt(payload);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };
  }
}
