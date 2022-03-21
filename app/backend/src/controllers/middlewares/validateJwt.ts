import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../utils/jwt';

interface Role {
  role: string;
}

const validateJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) return res.status(401).send('Token not found');
  try {
    const { role } = verifyToken(token) as Role;
    res.locals.jwt = role;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Expired or invalid token');
  }
};

export default validateJwt;
