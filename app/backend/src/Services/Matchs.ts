import Match from '../database/models/Match';
import Club from '../database/models/Club';

const getAll = async () => {
  const matchs = await Match.findAll({
    include: [{
      model: Club,
      as: 'homeClub',
      attributes: ['clubName'],
    },
    {
      model: Club,
      as: 'awayClub',
      attributes: ['clubName'],
    },
    ],
  });
  return matchs;
};

const getById = async (id: string) => {
  const match = await Match.findByPk(id);
  return match;
};

const getByProgress = async (inProgress: boolean) => {
  const matchs = await Match.findAll({
    where: { inProgress },
    include: [{
      model: Club,
      as: 'homeClub',
      attributes: ['clubName'],
    },
    {
      model: Club,
      as: 'awayClub',
      attributes: ['clubName'],
    },
    ],
  });
  return matchs;
};

export { getAll, getById, getByProgress };
