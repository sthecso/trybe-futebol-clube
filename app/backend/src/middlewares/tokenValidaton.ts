import { Request, Response } from 'express';
import { verify } from '../utils/jwt';

export default (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const user = verify(authorization as string);
  return user
    ? res.status(200).send(user.role)
    : res.status(401).json({ message: 'Invalid token' });
};
