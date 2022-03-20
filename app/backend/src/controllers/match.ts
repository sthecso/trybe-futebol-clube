import { RequestHandler } from 'express';

import {
  IMatchScore,
  IMatchCreate,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

import { MatchService } from '../services';

import StatusCodes from '../utils/StatusCodes';

const findAll: RequestHandler = async (req, res, _next) => {
  const { inProgress } = req.query;

  const result: IMatchComplete[] = await MatchService
    .findAll(inProgress === 'true');

  return res
    .status(StatusCodes.OK)
    .json(result);
};

const create: RequestHandler = async (req, res, _next) => {
  const newMatch: IMatchCreate = req.body;

  const result: IMatch = await MatchService.create(newMatch);

  return res
    .status(StatusCodes.CREATED)
    .json(result);
};

const finish: RequestHandler = async (req, res, _next) => {
  const { id: matchId } = req.params;

  const result = await MatchService.finish(Number(matchId));

  return res
    .status(StatusCodes.OK)
    .json({ result });
};

const edit: RequestHandler = async (req, res, _next) => {
  const { id: matchId } = req.params;
  const updatedScore: IMatchScore = req.body;

  const result = await MatchService.edit(Number(matchId), updatedScore);

  return res
    .status(StatusCodes.OK)
    .json({ result });
};

export { findAll, create, finish, edit };
