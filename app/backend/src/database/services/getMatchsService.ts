import { Match } from '../../utils/Interfaces';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

async function getMatchsService() {
  const matchs = await Matchs.findAll({
    include: [{ model: Clubs, as: 'homeClub' }, { model: Clubs, as: 'awayClub' }],
  });
  const retypeMatchs = matchs as unknown as Match[];

  const formatedMatchs = retypeMatchs.map((match: Match) => {
    const { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = match;
    const homeClub = { clubName: match.homeClub.clubName };
    const awayClub = { clubName: match.awayClub.clubName };
    return { id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress, homeClub, awayClub };
  });

  return formatedMatchs;
}

export default getMatchsService;
