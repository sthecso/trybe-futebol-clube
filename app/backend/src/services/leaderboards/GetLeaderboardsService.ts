import { GetLeaderboardsModel } from '../../models/leaderboards';

import { ILeaderboardsResponse } from '../../interfaces/leaderboards';

import {
  getEfficiency,
  leaderboardsAwayQuery,
  leaderboardsHomeQuery,
  orderArrayObjectByName,
  orderLeaderboards,
} from '../../utils';

class GetLeaderboardsService {
  private getLeaderboardsHomeModel = new GetLeaderboardsModel(leaderboardsHomeQuery);

  private getLeaderboardsAwayModel = new GetLeaderboardsModel(leaderboardsAwayQuery);

  private orderLeaderboards = orderLeaderboards;

  private getEfficiency = getEfficiency;

  private mapLeaderboards(
    leaderboardsHome: ILeaderboardsResponse[],
    leaderboardsAway: ILeaderboardsResponse[],
  ): ILeaderboardsResponse[] {
    return leaderboardsHome.map((teamHome, index) => {
      const teamAway = leaderboardsAway[index];

      const totalPoints = teamHome.totalPoints + teamAway.totalPoints;

      return { name: teamHome.name,
        totalPoints,
        totalGames: teamHome.totalGames + teamAway.totalGames,
        totalVictories: teamHome.totalVictories + teamAway.totalVictories,
        totalDraws: teamHome.totalDraws + teamAway.totalDraws,
        totalLosses: teamHome.totalLosses + teamAway.totalLosses,
        goalsFavor: teamHome.goalsFavor + teamAway.goalsFavor,
        goalsOwn: teamHome.goalsOwn + teamAway.goalsOwn,
        goalsBalance: teamHome.goalsBalance + teamAway.goalsBalance,
        efficiency: this.getEfficiency(totalPoints, teamHome.totalGames + teamAway.totalGames),
      };
    });
  }

  async handle() {
    let leaderboardsAway = await this.getLeaderboardsAwayModel.handle();
    leaderboardsAway = leaderboardsAway.sort(orderArrayObjectByName);

    let leaderboardsHome = await this.getLeaderboardsHomeModel.handle();
    leaderboardsHome = leaderboardsHome.sort(orderArrayObjectByName);

    const leaderboards = this.mapLeaderboards(leaderboardsHome, leaderboardsAway);

    return this.orderLeaderboards(leaderboards);
  }
}

export default GetLeaderboardsService;
