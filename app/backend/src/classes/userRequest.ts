import { Response, NextFunction } from 'express';
import { IRequest } from '../utils/interfaces';

export default class UserRequest {
  req: IRequest;

  res: Response;

  next: NextFunction;

  constructor(req: IRequest, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
}
