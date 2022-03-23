import * as jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
// import { IUserRequest } from '../types/interface';
import readKeyJWT from '../utils/readKeyJWT';

interface IPayload {
  iat: number;
  exp: number;
  id: string;
}

const validToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization.split(' ')[1], readKeyJWT);

    const { id } = decoded as IPayload;
    req.body.user = {
      id,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validToken;
