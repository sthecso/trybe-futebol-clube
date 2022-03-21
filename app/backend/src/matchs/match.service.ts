import { Request, Response } from 'express';
import Match from '../database/models/Match';
import Club from '../database/models/Club';

class MatchService {
  constructor() {
    this.getAllMatches = this.getAllMatches.bind(this);
    this.createMatch = this.createMatch.bind(this);
    this.updateMatchProgress = this.updateMatchProgress.bind(this);
    this.updateMatchGoals = this.updateMatchGoals.bind(this);
    this.getMatchsByInProgress = this.getMatchsByInProgress.bind(this);
  }

  _matches: Match[] | Match | null;

  _createdMatch: Match;

  _updatedMatchProgress: [number, Match[]];

  _updatedMatchGoals: [number, Match[]];

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

  public async updateMatchProgress(req: Request, res: Response) {
    const { id } = req.params;
    this._updatedMatchProgress = await Match.update(
      {
        inProgress: 0,
      },
      { where: { id } },
    );
    return res.status(200).json(this._updatedMatchProgress);
  }

  public async updateMatchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    this._updatedMatchGoals = await Match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id } },
    );
    return res.status(200).json(this._updatedMatchGoals);
  }

  public async getMatchsByInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      this._matches = await Match.findAll({
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] }],
      });
      return res.status(200).json(this._matches);
    }
    const result = inProgress === 'true' ? 1 : 0;
    this._matches = await Match.findAll({
      where: { inProgress: result },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] }],
    });
    return res.status(200).json(this._matches);
  }
}

export default new MatchService();
