import { Request } from 'express';
import IUser from './IUser';

interface RequestAuth extends Request {
  user?: IUser,
}

export default RequestAuth;
