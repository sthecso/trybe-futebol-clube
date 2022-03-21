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

// const createMatchs = async () => {

// }

export default getAllMatchs;
export { getMatchs };
