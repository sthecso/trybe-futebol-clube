import ITeamGoalsStatistic from './ITeamGoalsStatistic';

interface ILeaderboardsResponse extends ITeamGoalsStatistic {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  efficiency: number;
}

export default ILeaderboardsResponse;
