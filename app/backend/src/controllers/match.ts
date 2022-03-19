import { RequestHandler } from 'express';

import {
  IMatchSimple,
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
  const newMatch: IMatchSimple = req.body;

  const result = await MatchService
    .create(newMatch);

  return res
    .status(StatusCodes.CREATED)
    .json(result);
};

export { findAll, create };
