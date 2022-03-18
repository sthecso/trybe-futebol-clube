import { ILeaderboardsResponse } from '../interfaces/leaderboards';

const orderByGoalsOwn = (
  teamA: ILeaderboardsResponse,
  teamB: ILeaderboardsResponse,
) => {
  if (teamA.goalsOwn > teamB.goalsOwn) return -1;
  if (teamA.goalsOwn < teamB.goalsOwn) return 1;
  return 0;
};

const orderByGoalsFavor = (
  teamA: ILeaderboardsResponse,
  teamB: ILeaderboardsResponse,
) => {
  if (teamA.goalsFavor > teamB.goalsFavor) return -1;
  if (teamA.goalsFavor < teamB.goalsFavor) return 1;
  return orderByGoalsOwn(teamA, teamB);
};

const orderByGoalsBalance = (
  teamA: ILeaderboardsResponse,
  teamB: ILeaderboardsResponse,
) => {
  if (teamA.goalsBalance > teamB.goalsBalance) return -1;
  if (teamA.goalsBalance < teamB.goalsBalance) return 1;
  return orderByGoalsFavor(teamA, teamB);
};

const orderByTotalVictories = (
  teamA: ILeaderboardsResponse,
  teamB: ILeaderboardsResponse,
) => {
  if (teamA.totalVictories > teamB.totalVictories) return -1;
  if (teamA.totalVictories < teamB.totalVictories) return 1;
  return orderByGoalsBalance(teamA, teamB);
};

const orderLeaderboards = (
  leaderboards: ILeaderboardsResponse[],
): ILeaderboardsResponse[] => (
  leaderboards
    .sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      return orderByTotalVictories(a, b);
    })
);

export default orderLeaderboards;
