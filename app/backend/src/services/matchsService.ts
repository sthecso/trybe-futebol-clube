import Match from '../database/models/Match';
import Club from '../database/models/Club';

const getMatchs = async (inProgress: string) => {
  const result = await Match.findAll({
    include: [
      { model: Club, as: 'homeClub', attributes: { exclude: ['id'] } },
      { model: Club, as: 'awayClub', attributes: { exclude: ['id'] } },
    ],
  });

  if (inProgress) {
    const progress = result.filter((item) => String(item.inProgress) === inProgress);
    return progress;
  }

  return result;
};

export default getMatchs;
