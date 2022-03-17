import * as jwt from 'jsonwebtoken';

class Token {
  private jwt;

  constructor(webtoken: any) {
    this.jwt = webtoken;
  }

  async generate(payload: object): Promise<string> {
    return this.jwt.sign(payload, '123654987');
  }

  async verify(token: string): Promise<object> {
    return this.jwt.verify(token, '123654987');
  }
}

export default new Token(jwt);
