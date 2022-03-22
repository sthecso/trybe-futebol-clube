import { Request, Response } from 'express';
import getMatchsService from '../../services/Matchs/getMatchs';
import getMatchsInProgress from '../../services/Matchs/getMatchsInProgress';

async function getMatchsController(req: Request, res: Response) {
  const { inProgress } = req.query;
  if (inProgress === 'true' || inProgress === 'false') {
    const matchs = await getMatchsInProgress(inProgress);
    return res.status(200).json(matchs);
  }
  const matchs = await getMatchsService();
  return res.status(200).json(matchs);
}

export default getMatchsController;
