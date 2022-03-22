import IMatch from '../interfaces/Match';
import Club from '../database/models/Club';
import Match from '../database/models/Match';

const getAll = async (inProgress: boolean | undefined) => {
  if (inProgress === undefined) {
    const rows = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });

    return rows;
  }

  const rowsWhereProgress = await Match.findAll({
    where: { inProgress },
    include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
  });

  return rowsWhereProgress;
};

const getById = async (id: string) => {
  const match = await Match.findOne({ where: { id } });

  if (!match) return null;

  return match;
};

const create = async (data: IMatch) => {
  const match = await Match.create(data);

  return match;
};

const updateInProgress = async (id: string) => {
  const [result] = await Match.update(
    { inProgress: false },
    { where: { id } }
  );

  return result;
};

const updateResult = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  const [result] = await Match.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } }
  );

  return result;
};

export {
  getAll,
  getById,
  create,
  updateInProgress,
  updateResult,
};
