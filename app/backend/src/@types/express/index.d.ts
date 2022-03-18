import { IUserRes } from '../../database/interfaces/login';

declare global {
  namespace Express {
    interface Request {
      decodedUser: IUserRes
    }
  }
}
