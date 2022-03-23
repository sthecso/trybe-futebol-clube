import { Request, Response, NextFunction } from 'express';
import * as Jwt from 'jsonwebtoken';
import { validateJwt } from '../../jwt/authJWT';

const valideToken = async (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verifyToken = validateJwt(token) as unknown as Jwt.JwtPayload;

    const { id } = verifyToken;
    req.body.id = id;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default valideToken;
