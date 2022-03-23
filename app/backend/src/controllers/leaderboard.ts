import { RequestHandler } from 'express';
import { IClubStats } from '../utils/interfaces';
import { LeaderboardService } from '../services';
import StatusCodes from '../utils/StatusCodes';

const findAll: RequestHandler = async (_req, res, _next) => {
  const result: IClubStats[] = await LeaderboardService.findAll();

  return res
    .status(StatusCodes.OK)
    .json(result);
};

export default findAll;
