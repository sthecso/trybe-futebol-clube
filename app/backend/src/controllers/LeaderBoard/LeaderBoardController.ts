/* eslint-disable max-lines-per-function */
// With help of Murilo Rainho repo;

import { Response, NextFunction } from 'express';
import db from '../../database/models';
import StatusCode from '../../enums';
import { CustomRequest, ILeaderboard } from '../../interfaces';

const queryString = `
  SELECT 
    c.club_name AS name,
      SUM(IF(m.home_team_goals > m.away_team_goals,
        3,
          IF(m.home_team_goals < m.away_team_goals,
            0,
          1))) AS totalPoints,
    COUNT(c.club_name) AS totalGames,
    SUM(IF(m.home_team_goals > m.away_team_goals,
      1,
    0)) AS totalVictories,
    SUM(IF(m.home_team_goals = m.away_team_goals,
      1,
    0)) AS totalDraws,
    SUM(IF(m.home_team_goals < m.away_team_goals,
      1,
    0)) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
    TRIM(ROUND(SUM(IF(m.home_team_goals > m.away_team_goals,
      3,
        IF(m.home_team_goals < m.away_team_goals,
          0,
        1))) / (COUNT(c.club_name) * 3) * 100, 2)) + 0 AS efficiency
  FROM
    clubs c
  INNER JOIN
    matchs m ON c.id = m.home_team
  GROUP BY c.club_name, m.in_progress
  HAVING m.in_progress = 0
  ORDER BY
    totalPoints DESC ,
    totalVictories DESC ,
    goalsBalance DESC ,
    goalsFavor DESC ,
    goalsOwn DESC;
`;

export default class LeaderboardController {
  static async getHomeTeamsLeaderBoard(
    req: CustomRequest<ILeaderboard>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const [result] = await db.query(queryString);
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
      return res.status(StatusCode.OK).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}
