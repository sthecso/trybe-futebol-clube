import { RequestHandler } from 'express';

const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const verifyBody: RequestHandler = (req, res, next) => {
  if (regex.test(req.body.email) === false) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (req.body.password.length < 7) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

export default verifyBody;
