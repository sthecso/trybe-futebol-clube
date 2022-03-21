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
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = data;

  const match = await Match.create({
    homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress,
  });

  return match;
};

const updateInProgress = async (id: string) => {
  await Match.update({ inProgress: false }, { where: { id } });
};

const updateResult = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
};

export {
  getAll,
  getById,
  create,
  updateInProgress,
  updateResult,
};
