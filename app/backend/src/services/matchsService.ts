import { IMatch } from '../interfaces/IMatch';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import clubsService from './clubService';

const matchsService = {
  getAllInProgress: async (inProgress: boolean) =>
    Match.findAll({
      where: { inProgress },
      include: [
        {
          model: Club,
          as: 'homeClub',
          attributes: { exclude: ['id'] },
        },
        {
          model: Club,
          as: 'awayClub',
          attributes: { exclude: ['id'] },
        },
      ],
    }).then((matchArr) => matchArr.map((match) => match.get({ plain: true }))),

  getAll: async () => {
    const allMatchs = await Match.findAll({
      include: [
        {
          model: Club,
          as: 'homeClub',
          attributes: { exclude: ['id'] },
        },
        {
          model: Club,
          as: 'awayClub',
          attributes: { exclude: ['id'] },
        },
      ],
    }).then((matchArr) => matchArr.map((match) => match.get({ plain: true })));
    return allMatchs;
  },
  create: async (match: IMatch) => {
    const { homeTeam, awayTeam } = match;
    const newMatch = { ...match, inProgress: true };
    const homeClub = await clubsService.getById(homeTeam);
    const awayClub = await clubsService.getById(awayTeam);
    if (!homeClub || !awayClub) {
      const error = new Error('There is no team with such id!');
      throw error;
    }
    const matchCreate = await Match.create(newMatch);
    return matchCreate;
  },
  finishMatch: async (id: string) => {
    await Match.update({ inProgress: false }, { where: { id } });
  },
  updateMatch: async (
    id: string,
    homeTeamGoals: string,
    awayTeamGoals: string,
  ) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  },
};

export default matchsService;
