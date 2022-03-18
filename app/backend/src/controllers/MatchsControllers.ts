import { Request, Response } from 'express';
import Club from '../database/models/Club';
import Matchs from '../database/models/Matchs';

export default class MatchsController {
  static async all(req: Request, res: Response) {
    const matchs = await Matchs.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return res.status(200).json(matchs);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
  }
}
