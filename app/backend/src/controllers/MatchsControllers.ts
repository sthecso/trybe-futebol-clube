import { Request, Response } from 'express';
import { Op } from 'sequelize';
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
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const teams = await Club.findAndCountAll({
      where: { id: { [Op.in]: [homeTeam, awayTeam] } },
    });

    if (teams.count < 2) return res.status(401).json({ message: 'There is no team with such id!' });

    try {
      const newMatch = await Matchs.create({ ...req.body });
      return res.status(201).json(newMatch);
    } catch (error) {
      return res.status(500).json({ erro: error });
    }
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const [ok] = await Matchs.update({ inProgress: false }, { where: { id } });
      console.log('finishMatch', ok);

      return res.status(200).json({ message: 'Finished match' });
    } catch (error) {
      return res.status(500).json({ erro: error });
    }
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const [ok] = await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
      console.log('updateMatch', ok);

      return res.status(200).json({ message: 'Updated match' });
    } catch (error) {
      return res.status(500).json({ erro: error });
    }
  }
}
