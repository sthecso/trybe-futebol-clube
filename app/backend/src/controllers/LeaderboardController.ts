import { Request, Response } from 'express';
import { QueryTypes } from 'sequelize';
import Status from '../Enums/statusCode';
import sequelize from '../database/models';

export interface ILeaderboard {
  name: string,
  totalPoints: string,
  totalGames: string,
  totalVictories: string,
  totalDraws: string,
  totalLosses: string,
  goalsFavor: string,
  goalsOwn: string,
  goalsBalance: string,
  efficiency: string,
}

const sqlQuery = 'WITH totals AS ( '
+ ' SELECT '
+ ' c.club_name as name, '
+ ' sum(case when (m.home_team_goals - m.away_team_goals) > 0 '
+ ' then 1 else 0 end) as "totalVictories", '
+ ' sum(case when (m.home_team_goals - m.away_team_goals) = 0 '
+ ' then 1 else 0 end) as "totalDraws", '
+ ' sum(case when (m.home_team_goals - m.away_team_goals) < 0 '
+ ' then 1 else 0 end) as "totalLosses", '
+ '         sum(m.home_team_goals) as "goalsFavor", '
+ ' sum(m.away_team_goals) as "goalsOwn", '
+ '         count(m.id) as "totalGames" '
+ ' FROM TRYBE_FUTEBOL_CLUBE.matchs as m '
+ '     INNER JOIN TRYBE_FUTEBOL_CLUBE.clubs as c on m.home_team = c.id '
+ ' WHERE m.in_progress = false '
+ ' GROUP BY c.id '
+ ' ) '
+ ' SELECT t.*, '
+ ' (t.totalVictories * 3 + t.totalDraws) as "totalPoints", '
+ ' (t.goalsFavor - t.goalsOwn) as "goalsBalance", '
+ ' round(((t.totalVictories * 3 + t.totalDraws) / (t.totalGames * 3) * 100),2)  as "efficiency" '
+ ' FROM totals as t '
+ ' ORDER BY totalPoints DESC, t.totalVictories DESC, '
+ ' goalsBalance DESC, t.goalsFavor DESC, t.goalsOwn DESC; ';

class LeaderboardController {
  static async all(req: Request, res: Response) {
    const [result] = await sequelize.query(sqlQuery, { type: QueryTypes.RAW });

    const leaderboard: ILeaderboard[] = (result as ILeaderboard[]).map((item) => ({
      name: item.name,
      totalPoints: item.totalPoints,
      totalGames: item.totalGames.toString(),
      totalVictories: item.totalVictories,
      totalDraws: item.totalDraws,
      totalLosses: item.totalLosses,
      goalsFavor: item.goalsFavor,
      goalsOwn: item.goalsOwn,
      goalsBalance: item.goalsBalance,
      efficiency: Number(Number(item.efficiency).toFixed(2)).toString(),
    }));

    return res.status(Status.OK).json(leaderboard);
  }
}

export default LeaderboardController;
