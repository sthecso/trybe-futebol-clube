import { IPayload } from '../../utils/interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    token?: IPayload
  }
}
