import { Request } from 'express';

export default interface CustomRequest<T> extends Request {
  body: T,
  user? : string,
}
