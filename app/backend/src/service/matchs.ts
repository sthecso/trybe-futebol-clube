import Clubs from '../database/models/ClubModel';
import Matchs from '../database/models/MatchModel';

const findAllMatchs = async (param: string) => {
  if (param === 'true' || param === 'false') {
    const allMatchsProgressTrueOrFalse = await
    Matchs.findAll({
      where: { inProgress: JSON.parse(param) },
      include: [
        { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
        { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return allMatchsProgressTrueOrFalse;
  }
  const allMatchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ],
  });
  return allMatchs;
};

export default findAllMatchs;
