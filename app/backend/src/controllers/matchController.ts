import { Request, Response } from 'express';
import * as matchService from '../services/matchService';

const message = { message: 'Match not found' };

const getAll = async (req: Request, res: Response) => {
  const { inProgress } = req.query;
  let response: boolean | undefined;

  switch (inProgress) {
    case 'false':
      response = false;
      break;
    case 'true':
      response = true;
      break;
    default:
      response = undefined;
      break;
  }

  const matchs = await matchService.getAll(response);

  return res.status(200).json(matchs);
};

const create = async (req: Request, res: Response) => {
  const match = await matchService.create(req.body);

  if (!match) return res.status(404).json({ message: 'The match must be created as in progress' });

  return res.status(201).json(match);
};

const updateInProgress = async (req: Request, res: Response) => {
  const { id } = req.params;

  const match = await matchService.updateInProgress(id);

  if (!match) return res.status(404).json(message);

  return res.status(200).json({ message: 'Match finished' });
};

const updateResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const match = await matchService
    .updateResult(id, homeTeamGoals, awayTeamGoals);

  if (!match) return res.status(404).json(message);

  return res.status(200).json({ message: 'Match updated' });
};

export { getAll, create, updateInProgress, updateResult };
