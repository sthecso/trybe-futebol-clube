import { Request, Response } from 'express';
import MatchService from '../services/Matchs';

class MatchController {
  static async getMatchs(_res: Request, res: Response) {
    const { code, data } = await MatchService.getMatchs();
    res.status(code).json(data);
  }
}

export default MatchController;
