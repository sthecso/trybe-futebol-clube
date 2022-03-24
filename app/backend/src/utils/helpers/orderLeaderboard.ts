import { IClubStats } from '../interfaces';

const orderByGoalsReceived = (clubA: IClubStats, clubB: IClubStats) => {
  if (clubA.goalsOwn > clubB.goalsOwn) return -1;
  if (clubA.goalsOwn < clubB.goalsOwn) return 1;
  return 0;
};

const orderByGoalsScored = (clubA: IClubStats, clubB: IClubStats) => {
  if (clubA.goalsFavor > clubB.goalsFavor) return -1;
  if (clubA.goalsFavor < clubB.goalsFavor) return 1;
  return orderByGoalsReceived(clubA, clubB);
};

const orderByGoalsBalance = (clubA: IClubStats, clubB: IClubStats) => {
  if (clubA.goalsBalance > clubB.goalsBalance) return -1;
  if (clubA.goalsBalance < clubB.goalsBalance) return 1;
  return orderByGoalsScored(clubA, clubB);
};

const orderByTotalWins = (clubA: IClubStats, clubB: IClubStats) => {
  if (clubA.totalVictories > clubB.totalVictories) return -1;
  if (clubA.totalVictories < clubB.totalVictories) return 1;
  return orderByGoalsBalance(clubA, clubB);
};

const orderByTotalPoints = (clubA: IClubStats, clubB: IClubStats) => {
  if (clubA.totalPoints > clubB.totalPoints) return -1;
  if (clubA.totalPoints < clubB.totalPoints) return 1;
  return orderByTotalWins(clubA, clubB);
};

const orderLeaderboard = (leaderboard: IClubStats[]) => (
  leaderboard.sort((clubA: IClubStats, clubB: IClubStats) =>
    orderByTotalPoints(clubA, clubB))
);

export default orderLeaderboard;
