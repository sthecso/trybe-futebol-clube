import { Request, Response } from 'express';
import getMatchsService from '../services/matchsService';

const getMatchs = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  const result = await getMatchsService(inProgress as string);

  return res.status(200).json(result);
};

export default getMatchs;
