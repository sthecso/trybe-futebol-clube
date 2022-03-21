import { Request, Response } from 'express';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

class MatchService {
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
  }

  _matches: Match[];

  _createdMatch: Match;

  _updatedMatch: [number, Match[]];

  public async getAllMatches(req: Request, res: Response) {
    this._matches = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return res.status(200).json([...this._matches]);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    this._createdMatch = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });
    return res.status(201).json(this._createdMatch);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    this._updatedMatch = await Match.update(
      {
        inProgress: 0,
      },
      { where: { id } },
    );
    console.log(this._updatedMatch);
    return res.status(200).json(this._updatedMatch);
  }
}

export default new MatchService();
