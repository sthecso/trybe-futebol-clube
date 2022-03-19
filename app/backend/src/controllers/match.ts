import { RequestHandler } from 'express';
import { IMatchComplete } from '../utils/interfaces';
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

export default findAll;
