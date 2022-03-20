import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import path = require('path');
import { IUserJwt } from '../interface/user';

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

  private async findSenha() {
    this._senha = await fs.readFile(
      path.resolve(__dirname, '..', '..', 'jwt.evaluation.key'),
      'utf-8',
    );
  }

  verify(token:string) {
    const result = Jwt.verify(token, this._senha);
    return result as unknown as IUserJwt;
  }

  sign(payload:Payload) {
    const token = Jwt.sign(payload, this._senha, this._data);
    return token;
  }
}

export default new HelpJwt();
