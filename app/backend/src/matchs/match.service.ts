import { Request, Response } from 'express';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

class MatchService {
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
  }

  _matches: Match[];

  public async getAllMatches(req: Request, res: Response) {
    this._matches = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return res.status(200).json([...this._matches]);
  }
}

export default new MatchService();
