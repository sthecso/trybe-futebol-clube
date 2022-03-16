/* import jwt = require('jsonwebtoken');
import fs = require('fs/promises'); */
import { RequestHandler } from 'express';
import services from '../services/club';

const getAll: RequestHandler = async (_req, res) => {
  const user = await services.getAll();
  return res.status(200).json(user);
};

export default { getAll };
