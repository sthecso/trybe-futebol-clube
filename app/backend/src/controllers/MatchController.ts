import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Match from '../database/models/Match';
import Club from '../database/models/Club';
import Status from '../Enums/statusCode';

const equalTeams = 'It is not possible to create a match with two equal teams';
const noTeam = 'There is no team with such id!';

class MatchController {
  static async all(_req: Request, res: Response) {
    const matchs = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return res.status(Status.OK).json(matchs);
  }

  static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) return res.status(Status.UNAUTHORIZED).json({ message: equalTeams });

    const teams = await Club.findAndCountAll({
      where: { id: { [Op.in]: [homeTeam, awayTeam] } },
    });
    if (teams.count < 2) return res.status(Status.UNAUTHORIZED).json({ message: noTeam });

    try {
      const newMatch = await Match.create({ ...req.body });
      return res.status(Status.CREATED).json(newMatch);
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ erro: error });
    }
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const [ok] = await Match.update({ inProgress: false }, { where: { id } });
      console.log('finishMatch', ok);
      return res.status(Status.OK).json({ message: 'Finished match' });
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ erro: error });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const [ok] = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
      console.log('updateMatch', ok);
      return res.status(Status.OK).json({ message: 'Updated match' });
    } catch (error) {
      return res.status(Status.INTERNAL_SERVER_ERROR).json({ erro: error });
    }
  }
}

export default MatchController;
