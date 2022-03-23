import { calculateLeaderboardAway, calculateLeaderboardHome,
  sortLeaderboard } from '../utils/helperFunctions';
import matchsService from './matchsService';

const leaderboardServices = {
  getAll: async (teamField: string) => {
    const matchs = await matchsService.getAllInProgress(false);
    const leaderboard = teamField === 'home'
      ? calculateLeaderboardHome(matchs) : calculateLeaderboardAway(matchs);
    const clubsName = Object.keys(leaderboard);
    const leaderboardInArray = clubsName.map((clubName) => ({ ...leaderboard[clubName] }));
    return sortLeaderboard(leaderboardInArray);
  },
};

export default leaderboardServices;
