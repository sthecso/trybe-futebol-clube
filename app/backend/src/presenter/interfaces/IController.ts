import { Request } from 'express';
import IHttpResponse from './IHttpResponse';

interface IController {
  handle(req: Request): Promise<IHttpResponse>;
}

export default IController;
