import { RequestHandler } from 'express';
import services from '../services/match';

const getAll: RequestHandler = async (_req, res) => {
  const user = await services.getAll();
  return res.status(200).json(user);
};

export default { getAll };
