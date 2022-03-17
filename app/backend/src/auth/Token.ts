import * as jwt from "jsonwebtoken";

interface IJwt {
  sign(payload: object, secretOrPrivateKey: string): string;
  verify(payload: string, secretOrPrivateKey: string): object;
}

class Token {
  private jwt: IJwt;

  constructor(webtoken: any) {
    this.jwt = webtoken;
  }

  generate(payload: object): string {
    return this.jwt.sign(payload, "123654987");
  }

  verify(token: string): object {
    return this.jwt.verify(token, "123654987");
  }
}


export default new Token(jwt);
