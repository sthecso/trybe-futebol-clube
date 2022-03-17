import { IUserResponse } from '../../interfaces/login';

declare global {
  namespace Express {
    export interface Request {
      userDataDecoded: IUserResponse;
    }
  }
}
