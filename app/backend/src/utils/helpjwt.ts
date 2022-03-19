import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import path = require('path');

interface Payload {
  id: number,
  username: string,
  role: string,
  email: string
}

class HelpJwt { // alterar o nome
  private _data:Jwt.SignOptions = { expiresIn: '10h', algorithm: 'HS256' };

  private _senha:string;

  constructor() {
    this.findSenha();
  }

  async findSenha() {
    this._senha = await fs.readFile(
      path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'),
      'utf-8',
    );
  }

  verify(token:string) {
    Jwt.verify(token, this._senha);
  }

  async sign(payload:Payload) {
    const token = Jwt.sign(payload, this._senha, this._data);
    return token;
  }
}

export default new HelpJwt();
