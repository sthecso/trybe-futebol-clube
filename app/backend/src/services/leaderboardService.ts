import calculateLeaderboardHome from '../utils/helperFunctions';
import matchsService from './matchsService';

const leaderboardServices = {
  getAllHome: async () => {
    const matchs = await matchsService.getAllInProgress(false);
    const leaderboard = calculateLeaderboardHome(matchs);
    const clubsName = Object.keys(leaderboard);
    const leaderboardInArray = clubsName.map((clubName) => ({ ...leaderboard[clubName] }));
    return leaderboardInArray.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
  },
};

export default leaderboardServices;
