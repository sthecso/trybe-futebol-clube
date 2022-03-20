import { IMatch } from '../utils/interfaces';
import Club from '../database/models/Club';
import Match from '../database/models/Match';
import clubsService from './clubsService';

const matchsService = {
  getAllWithQuery: async (inProgress: boolean) => Match.findAll({
    where: { inProgress },
    include: [{
      model: Club,
      as: 'homeClub',
      attributes: { exclude: ['id'] },
    },
    {
      model: Club,
      as: 'awayClub',
      attributes: { exclude: ['id'] },
    }],
  }),

  getAll: async () => Match.findAll({
    include: [{
      model: Club,
      as: 'homeClub',
      attributes: { exclude: ['id'] },
    },
    {
      model: Club,
      as: 'awayClub',
      attributes: { exclude: ['id'] },
    }],
  }),
  create: async (match: IMatch) => {
    const { homeTeam, awayTeam } = match;
    const homeClub = await clubsService.getById(homeTeam);
    const awayClub = await clubsService.getById(awayTeam);
    if (!homeClub || !awayClub) {
      const error = new Error('There is no team with such id!');
      throw error;
    }
    const matchCreated = await Match.create(match);
    return matchCreated;
  },
};

export default matchsService;
