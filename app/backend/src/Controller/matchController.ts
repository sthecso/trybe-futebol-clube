import { Router, Request, Response } from 'express';
import getAllMatchs, {
  getMatchs, createMatchs, updateMatch, changeGoalsTeam } from '../Services/matchService';
import validateToken from './Middlewares/tokenValidation';
import validateTeams, { checkTeam } from './Middlewares/validateMatchs';

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

matchs.post('/', validateToken, validateTeams, checkTeam, async (req: Request, res: Response) => {
  const match = await createMatchs(req.body);

  res.status(200).json(match);
});

matchs.patch('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const i = Number(id);
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const match = await changeGoalsTeam(i, homeTeamGoals, awayTeamGoals);

  res.status(200).json(match);
});

matchs.patch('/:id/finish', async (req: Request, res: Response) => {
  const { id } = req.params;
  const i = Number(id);
  const updatedMatch = await updateMatch(i);

  res.status(200).json(updatedMatch);
});

export default matchs;
