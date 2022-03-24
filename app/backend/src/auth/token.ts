import { Request, Response, NextFunction } from 'express';
import { readFileSync } from 'fs';
import * as Jwt from 'jsonwebtoken';
// import * as bcrypt from 'bcryptjs';

const JWT_SECRET: Jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf8').trim();

const createToken = (payload: Jwt.JwtPayload) => Jwt.sign(payload, JWT_SECRET);

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = Jwt.verify(token, JWT_SECRET) as unknown as Jwt.JwtPayload;
    const { email } = decoded;
    req.body.id = email;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { createToken, validateToken };
