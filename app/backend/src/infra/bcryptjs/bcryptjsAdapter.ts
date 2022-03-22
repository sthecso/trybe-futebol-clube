import { compare as bcryptjsCompare } from 'bcryptjs';
import IHashComparer from '../../data/interfaces/crypt/IComparer';

class BcryptjsAdapter implements IHashComparer {
  async compare(text: string, hash: string): Promise<boolean> {
    if (!this) console.log('');
    return bcryptjsCompare(text, hash);
  }
}

export default BcryptjsAdapter;
