import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const jwtSecret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const validate = jwt.verify(authorization, jwtSecret);
    if (!validate) {
      return res.status(401).json({ nessage: 'Token expired or invalid' });
    }
    req.body.validate = validate;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};

export default validateToken;
