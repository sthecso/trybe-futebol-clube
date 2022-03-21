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

  return res.status(201).json(match);
};

const updateInProgress = async (req: Request, res: Response) => {
  const { id } = req.params;

  await matchService.updateInProgress(id);

  const match = await matchService.getById(id);
  if (!match) return res.status(404).json(message);

  return res.status(200).json(match);
};

const updateResult = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  await matchService.updateResult(id, homeTeamGoals, awayTeamGoals);

  const match = await matchService.getById(id);
  if (!match) return res.status(404).json(message);

  return res.status(200).json(match);
};

export { getAll, create, updateInProgress, updateResult };
