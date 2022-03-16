import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import { RequestHandler } from 'express';
import services from '../services/user';

const getUser: RequestHandler = async (req, res) => {
  const user = await services.getUser(req.body);
  if (user === null) return res.status(400).json({ message: 'usuario nao encontrado' });
  const { email, password } = req.body;
  const senha = await fs.readFile('../../../jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ email, password }, senha, { expiresIn: '7D', algorithm: 'HS256' });
  return res.status(201).json({ token });
};

export default getUser;
