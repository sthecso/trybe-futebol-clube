import { JwtPayload } from 'jsonwebtoken';

export default interface ILogin {
  email: string;
  password: string;
  user?: JwtPayload,
}
