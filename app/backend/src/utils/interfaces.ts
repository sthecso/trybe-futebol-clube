import { Request } from 'express';

export interface IRequest extends Request {
  user?: string | object;
}

export interface ILogin {
  email: string;
  password: string;
}
