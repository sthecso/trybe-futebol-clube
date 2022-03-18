import InsertMatch from '../Types/insertMatch';
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

const insertMatch = async (match: InsertMatch) => {
  const newMatch = await Match.create(match);
  return newMatch;
};

const finishMatch = async (id: string):Promise<boolean> => {
  const match = await Match.findByPk(id);
  if (!match) {
    return false;
  }
  match.update({ inProgress: false });
  return true;
};

export { getAll, getById, getByProgress, insertMatch, finishMatch };
