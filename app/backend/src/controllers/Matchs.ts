import { Request, Response } from 'express';
import MatchService from '../services/Matchs';

class MatchController {
  static async getMatchs(_res: Request, res: Response) {
    const { code, data } = await MatchService.getMatchs();
    res.status(code).json(data);
  }

  static async getMatchsInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const { code, data } = await MatchService.getMatchsInProgress(inProgress);
      res.status(code).json(data);
    }
  }
}

export default MatchController;
