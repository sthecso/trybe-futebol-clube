import { Request, Response } from 'express';
import * as matchService from '../services/matchService';

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

export { getAll };
