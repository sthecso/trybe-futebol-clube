/* import jwt = require('jsonwebtoken');
import fs = require('fs/promises'); */
import { RequestHandler } from 'express';
import services from '../services/club';

const getAll: RequestHandler = async (_req, res) => {
  const user = await services.getAll();
  return res.status(200).json(user);
};

const findClub: RequestHandler = async (req, res) => {
  const { clubName } = req.body;
  const club = await services.findClub(clubName);
  return res.status(200).json({ club });
};

export default { getAll, findClub };
