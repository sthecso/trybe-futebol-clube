import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestAuth extends Request {
  user?: JwtPayload,
}

export interface IUser {
  email: string;
  password: string;
}