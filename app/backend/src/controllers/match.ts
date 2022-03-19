import { RequestHandler } from 'express';
import { IMatchComplete } from '../utils/interfaces';
import { MatchService } from '../services';
import StatusCodes from '../utils/StatusCodes';

const findAll: RequestHandler = async (_req, res, _next) => {
  const result: IMatchComplete[] = await MatchService.findAll();

  return res
    .status(StatusCodes.OK)
    .json(result);
};

export default findAll;
