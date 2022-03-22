import matchModel from '../database/models/Matchs';
import Clubs from '../database/models/Clubs';

const getAllMatchs = async () => {
  const allMatchs = await matchModel.findAll({
    include: [{
      model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
    { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } }],
  });

  return allMatchs;
};

const getMatchs = async (param: string) => {
  if (param === 'true') {
    const inProgressMatchs = await matchModel.findAll({
      where: { in_progress: true },
      include: [{
        model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } }],
    });

    return inProgressMatchs;
  }
  if (param === 'false') {
    const doneMatchs = await matchModel.findAll({
      where: { in_progress: false },
      include: [{
        model: Clubs, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Clubs, as: 'awayClub', attributes: { exclude: ['id'] } }],
    });

    return doneMatchs;
  }
};

const createMatchs = async (body: object) => {
  const matchCreated = await matchModel.create(body);

  return matchCreated;
};

const updateMatch = async (id: number) => {
  await matchModel.update({ inProgress: false }, { where: { id } });

  const match = await matchModel.findOne({ where: { id } });

  return match;
};

const changeGoalsTeam = async (id: number, home: number, away: number) => {
  await matchModel.update({ homeTeamGoals: home, awayTeamGoals: away }, { where: { id } });

  const match = await matchModel.findOne({ where: { id } });

  return match;
};

export default getAllMatchs;
export { getMatchs, createMatchs, updateMatch, changeGoalsTeam };
