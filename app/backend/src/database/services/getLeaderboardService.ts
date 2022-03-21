import { ClubsAndMatchs } from '../../utils/Interfaces';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

function filterClubToReturnToUser(club: ClubsAndMatchs[]) {
  const newLeaderboard = club.map((clubObject) => {
    const leaderboard = {
      name: clubObject.clubName,
    };

    return leaderboard;
  });
  return newLeaderboard;
}

async function getLeaderboardService() {
  const clubsAndMatchs = await Clubs.findAll({
    include: [{
      model: Matchs,
      attributes: [['home_team_goals', 'golsFeitos'], ['away_team_goals', 'golsTomados']],
      where: { inProgress: false },
    }],
  });
  const clubsAndMatchs2 = clubsAndMatchs as unknown as ClubsAndMatchs[];
  const responseLeaderboard = filterClubToReturnToUser(clubsAndMatchs2);
  return responseLeaderboard;
}

export default getLeaderboardService;
