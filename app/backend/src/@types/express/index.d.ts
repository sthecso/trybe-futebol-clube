import { IUser } from '../../utils/interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser;
  }
}
