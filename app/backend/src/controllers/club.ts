import { RequestHandler } from 'express';
import { IClub } from '../utils/interfaces';
import { ClubService } from '../services';
import StatusCodes from '../utils/StatusCodes';

const findAll: RequestHandler = async (_req, res, _next) => {
  const result: IClub[] = await ClubService.findAll();

  return res
    .status(StatusCodes.OK)
    .json(result);
};

const findById: RequestHandler = async (req, res, _next) => {
  const { id } = req.params;

  const result: IClub = await ClubService.findById(Number(id));

  return res
    .status(StatusCodes.OK)
    .json(result);
};

export { findAll, findById };
