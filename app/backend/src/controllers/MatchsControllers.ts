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

    if (teams.count < 2) return res.status(401).json({ message: 'Team not found' });

    try {
      const newMatch = await Matchs.create({ ...req.body, inProgress: true });
      return res.status(201).json(newMatch);
    } catch (error) {
      return res.status(500).json({ erro: error });
    }
  }
}
