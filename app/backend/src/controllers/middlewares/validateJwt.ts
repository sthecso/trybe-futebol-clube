import { Request, Response } from 'express';
import { verifyToken } from '../../utils/jwt';

interface Role {
  role: string;
}

const validateJwt = async (req: Request, res: Response) => {
  const token: string | undefined = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const { role } = verifyToken(token) as Role;
    res.locals.jwt = role;

    return res.status(200).json(role);
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateJwt;
