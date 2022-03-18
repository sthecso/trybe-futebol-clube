import * as jwt from 'jsonwebtoken';
import readFile from '../tools/readFile';

class Token {
  private jwt;

  private secretKey: string;

  constructor(webtoken: any) {
    this.jwt = webtoken;
  }

  async generate(payload: object): Promise<string> {
    this.secretKey = (await readFile('jwt.evaluation.key')).trim();

    return this.jwt.sign(payload, this.secretKey);
  }

  async verify(token: string): Promise<object> {
    this.secretKey = (await readFile('jwt.evaluation.key')).trim();
    return this.jwt.verify(token, this.secretKey);
  }
}

export default new Token(jwt);
