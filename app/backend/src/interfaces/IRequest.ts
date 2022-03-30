import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ExtendsRequest extends Request {
  user?: JwtPayload
}

export default ExtendsRequest;
