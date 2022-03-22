import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

const MatchController = async (_req: Request, res: Response) => {
  const allMatches = await MatchService.getAllMatches();

  res.status(200).json(allMatches);
};

export default MatchController;
