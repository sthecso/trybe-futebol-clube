import { compare, hash } from 'bcryptjs'

export default class Bcrypt {
  private password: string;
  private hash: string;

  constructor(password: string, hash: string) {
    this.password = password;
    this.hash = hash;
  }
  async decrypt(): Promise<boolean> {
    const result = await compare(this.password, this.hash)
    return result
  }

  async encrypt() {
    const result = await hash(this.password, 8);
    return result
  }
}
