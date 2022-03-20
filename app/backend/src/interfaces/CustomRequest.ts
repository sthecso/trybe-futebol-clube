import { Request } from 'express';

export default interface CustomRequest<T> extends Request {
  body: {
    email: T,
    password: T,
  }
}
