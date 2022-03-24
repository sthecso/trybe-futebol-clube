import { NextFunction, Response } from 'express';
import IUser from '../../interfaces/IUser';
import jwtHelper from '../../helpers/jwtHelper';
import RequestAuth from '../../interfaces/IRequestAuth';

const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const data = jwtHelper.verify(token) as IUser;
    req.user = { ...data };
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

export default auth;
