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
    const fields = 'All fields must be filled/Unauthorized';
    const myshema = z.object({
      email: z.string({
        required_error: fields,
        invalid_type_error: 'Email must be a string/Unauthorized' })
        .min(1, fields)
        .email('Incorrect email or password/Unauthorized'),
      password: z.string({
        required_error: fields,
        invalid_type_error: 'Password must be a string/Unauthorized',
      }).min(7, fields),
    });

    myshema.parse({ email: this._email, password: this._password });
  }
}
