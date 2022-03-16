import { RequestHandler } from 'express';

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const verifyBody: RequestHandler = (req, res, next) => {
  if (regex.test(req.body.email) === false || !req.body.email) {
    return res.status(400).json({ message: 'Email invalido' });
  }

  if (req.body.password.length < 7 || !req.body.password) {
    return res.status(400).json({ message: 'Password tem que ter no minimo 7 caracteres' });
  }

  next();
};

export default verifyBody;
