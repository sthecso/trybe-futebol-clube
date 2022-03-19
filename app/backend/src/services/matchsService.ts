import Club from '../database/models/Club';
import Match from '../database/models/Match';

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
};

export default matchsService;
