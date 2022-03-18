import { z } from 'zod';

interface Login{
  email:string,
  password:string
}
export default class ValidLogin {
  private _email;

  private _password;

  constructor({ email, password }:Login) {
    this._email = email;
    this._password = password;
    this.verify();
  }

  private verify():void {
    const myshema = z.object({
      email: z.string().email('type email required'),
      password: z.string().min(6, 'password must be longer than 6 characters'),
    }).strict();

    myshema.parse({ email: this._email, password: this._password });
  }
}
