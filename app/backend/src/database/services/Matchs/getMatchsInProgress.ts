import Matchs from '../../models/Matchs';
import Clubs from '../../models/Clubs';

async function getMatchsInProgress(inProgress: string) {
  let boolValue;
  if (inProgress === 'true') boolValue = true;
  if (inProgress === 'false') boolValue = false;
  const matchs = await Matchs.findAll({ where: { inProgress: boolValue },
    include: [{ model: Clubs, as: 'homeClub' }, { model: Clubs, as: 'awayClub' }] });
  return matchs;
}

export default getMatchsInProgress;
