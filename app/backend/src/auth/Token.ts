import * as jwt from 'jsonwebtoken';
import readFile from '../tools/readFile';

class Token {
  private secretKey: string;

  async generate(payload: object): Promise<string> {
    this.secretKey = (await readFile('jwt.evaluation.key')).trim();

    return jwt.sign(payload, this.secretKey);
  }

  async verify(token: string): Promise<string | jwt.JwtPayload> {
    this.secretKey = (await readFile('jwt.evaluation.key')).trim();
    const tokenVerify = jwt.verify(token, this.secretKey);
    return tokenVerify;
  }
}

export default new Token();
