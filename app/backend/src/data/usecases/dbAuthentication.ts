import { UserModel } from '../../database/models';
import IAuthentication, { AuthParams, AuthResult } from '../../domain/usecases/IAuthentication';
import IGetUserByEmailRepository from '../interfaces/db/IGetUserByEmailRepository';
import IComparer from '../interfaces/crypt/IComparer';
import IEncrypter from '../interfaces/crypt/IEncrypter';

class DbAuthentication implements IAuthentication {
  constructor(
    public userRepository: IGetUserByEmailRepository,
    public hashComparer: IComparer,
    public encrypter: IEncrypter,
  ) {}

  async auth(params: AuthParams): Promise<AuthResult | null> {
    const user = await this.userRepository.getByEmail(params.email);
    if (user) {
      const valid = await this.hashComparer.compare(params.password, (user as UserModel).password);
      if (valid) {
        const { id } = user;
        const token = await this.encrypter.encrypt(id.toString());
        return {
          token,
          user: { id: user.id, username: user.username, role: user.role, email: user.email },
        };
      }
    }
    return null;
  }
}

export default DbAuthentication;
