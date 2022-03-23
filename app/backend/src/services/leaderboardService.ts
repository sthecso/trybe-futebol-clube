import { ILeaderboardObject } from '../utils/interfaces';
import {
  calculateLeaderboardAll, calculateLeaderboardAway, calculateLeaderboardHome,
  sortLeaderboard,
} from '../utils/helperFunctions';
import matchsService from './matchsService';

const leaderboardServices = {
  getAll: async (teamField?: string) => {
    const matchs = await matchsService.getAllInProgress(false);
    let leaderboard = {} as ILeaderboardObject;
    if (teamField === 'home') leaderboard = calculateLeaderboardHome(matchs);
    if (teamField === 'away') leaderboard = calculateLeaderboardAway(matchs);
    if (!teamField) leaderboard = calculateLeaderboardAll(matchs);
    const clubsName = Object.keys(leaderboard);
    const leaderboardInArray = clubsName.map((clubName) => ({ ...leaderboard[clubName] }));
    return sortLeaderboard(leaderboardInArray);
  },
};

export default leaderboardServices;
