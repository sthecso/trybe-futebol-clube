import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import jwtConfig from '../utils';
import User from '../database/models/User';

interface TokenPayload {
  email: string;
}

interface RequestData extends Request {
  email?: TokenPayload
}

async function findEmail(email: string) {
  const user = await User.findOne({ where: { email },
  }) || undefined;
  return user;
}

export default async (req: RequestData, res: Response, next: NextFunction) => {
  const secret = jwtConfig.jwt.secret as unknown as string;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json('Token not found');
  }

  try {
    const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] }) as jwt.JwtPayload;
    const receivedEmail = decoded.sub as string;
    const email = await findEmail(receivedEmail);

    req.email = email;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token', err });
  }
};
