import { sign } from 'jsonwebtoken';
import IEncrypter from '../../data/interfaces/crypt/IEncrypter';

class JwtAdapter implements IEncrypter {
  constructor(public jwtSecret: string) {}

  async encrypt(plaintext: string): Promise<string> {
    return sign({ id: plaintext }, this.jwtSecret);
  }
}

export default JwtAdapter;
