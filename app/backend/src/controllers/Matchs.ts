import { RequestHandler } from 'express';
import * as matchsService from '../Services/Matchs';

const getAll: RequestHandler = async (req, res) => {
  const { inProgress } = req.query;

  if (typeof inProgress === 'undefined') {
    const matchs = await matchsService.getAll();
    return res.status(200).json(matchs);
  }

  const clubs = await matchsService.getByProgress(inProgress === 'true');
  res.status(200).json(clubs);
};

const getById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const club = await matchsService.getById(id);
  res.status(200).json(club);
};

export { getAll, getById };
