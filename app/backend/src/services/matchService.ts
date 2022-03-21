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

export {
  getAll,
};
