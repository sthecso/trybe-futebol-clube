import { Router, Request, Response } from 'express';
import getAllMatchs, { getMatchs } from '../Services/matchService';

const matchs = Router();

matchs.get('/:inProgress?', async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (!inProgress) {
    const allMatchs = await getAllMatchs();
    return res.status(200).json(allMatchs);
  }

  const match = await getMatchs(inProgress.toString());

  res.status(200).json(match);
});

matchs.get('/', async (_req: Request, res: Response) => {
  const allMatchs = await getAllMatchs();

  res.status(200).json(allMatchs);
});

export default matchs;
