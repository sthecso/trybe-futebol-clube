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
      email: z.string({
        required_error: 'All fields must be filled/Unauthorized',
        invalid_type_error: 'Email must be a string/BADREQUEST' })
        .email('type email required/BADREQUEST'),
      password: z.string({
        required_error: 'All fields must be filled/Unauthorized',
        invalid_type_error: 'Password must be a string/BADREQUEST',
      }).min(7, 'password must be longer than 6 characters/BADREQUEST'),
    });

    myshema.parse({ email: this._email, password: this._password });
  }
}
