import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const JWT_SECRET:Jwt.Secret = readFileSync('./jwt.evaluation.key', 'utf-8');

const valideToken = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = Jwt.verify(token, JWT_SECRET) as unknown as Jwt.JwtPayload;
    const { id } = decoded;
    req.body.id = id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default valideToken;
