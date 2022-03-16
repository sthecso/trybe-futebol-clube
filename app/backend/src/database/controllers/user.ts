import jwt = require('jsonwebtoken');
import fs = require('fs/promises');
import { RequestHandler } from 'express';
import services from '../services/user';
import User from '../models/user';

const getUser: RequestHandler = async (req, res) => {
  const userr = await services.getUser(req.body);
  if (userr === null) return res.status(400).json({ message: 'usuario nao encontrado' });
  const { email, password } = req.body;
  const senha = await fs.readFile('../../../jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ email, password }, senha, { expiresIn: '7D', algorithm: 'HS256' });
  const user = { userr };
  return res.status(201).json({ user, token });
};

const verifyUser: RequestHandler = async (req, res) => {
  try {
    let token = req.headers.authorization;
    token = `${token}`;
    const senha = await fs.readFile('../../../jwt.evaluation.key', 'utf8');
    const decoded = jwt.verify(token, senha);
    const { username, password } = <any>decoded;
    const user = await User.findOne({ where: { username, password }, attributes: ['role'] });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
  }
};
export default { getUser, verifyUser };
