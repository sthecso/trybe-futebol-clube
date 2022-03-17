import { Request, Response } from 'express';
import getMatchsService from '../services/getMatchsService';

async function getMatchsController(_req: Request, res: Response) {
  const matchs = await getMatchsService();

  return res.status(200).json(matchs);
}

export default getMatchsController;
