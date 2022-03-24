import { Request, Response } from 'express';
import MatchService from '../services/Matchs';

class MatchController {
  static async getMatchs(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchs = await MatchService.getMatchs(inProgress as string);
    res.status(200).json(matchs);
  }
}

export default MatchController;
