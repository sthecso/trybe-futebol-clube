import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';
import Status from '../Enums/Codes';
import secret from '../Utils/secret';

const validateToken:RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, secret);

  if (!token) {
    return res.status(Status.unauthorized).json({ error: 'Token not found' });
  }
  try {
    console.log(token, secret);
    jwt.verify(token, secret);
    next();
  } catch (_e) {
    console.log('deu erro');
    return res.status(Status.unauthorized).json({ error: 'Invalid token' });
  }
};

export default validateToken;
