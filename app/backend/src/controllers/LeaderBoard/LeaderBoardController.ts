/* eslint-disable max-lines-per-function */
// With help of Murilo Rainho repo;

import { Response, NextFunction } from 'express';
import db from '../../database/models';
import StatusCode from '../../enums';
import { CustomRequest, ILeaderboard } from '../../interfaces';

const queryStringHomeLeaderboard = `
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

const queryStringAwayLeaderboard = `
SELECT 
c.club_name AS name,
  (SUM(IF(m.away_team_goals > m.home_team_goals,
    3,
      IF(m.away_team_goals < m.home_team_goals,
        0,
      1)))) AS totalPoints,
COUNT(c.club_name) AS totalGames,
SUM(IF(m.away_team_goals > m.home_team_goals,
  1,
0)) AS totalVictories,
(SUM(IF(m.away_team_goals = m.home_team_goals,
  1,
0))) AS totalDraws,
SUM(IF(m.away_team_goals < m.home_team_goals,
  1,
0)) AS totalLosses,
SUM(m.away_team_goals) AS goalsFavor,
SUM(m.home_team_goals) AS goalsOwn,
SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
TRIM(ROUND(SUM(IF(m.away_team_goals > m.home_team_goals,
  3,
    IF(m.away_team_goals < m.home_team_goals,
      0,
    1))) / (COUNT(c.club_name) * 3) * 100, 2)) + 0 AS efficiency
FROM
clubs c
INNER JOIN
matchs m ON c.id = m.away_team
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
      const [homeTeamLeaderboard] = await db.query(queryStringHomeLeaderboard);
      const leaderboard: ILeaderboard[] = (homeTeamLeaderboard as ILeaderboard[]).map((item) => ({
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

  static async getHomeAwayLeaderBoard(
    req: CustomRequest<ILeaderboard>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const [awayTeamLeaderboard] = await db.query(queryStringAwayLeaderboard);
      const leaderboard: ILeaderboard[] = (awayTeamLeaderboard as ILeaderboard[]).map((el) => ({
        name: el.name,
        totalPoints: el.totalPoints,
        totalGames: el.totalGames.toString(),
        totalVictories: el.totalVictories,
        totalDraws: el.totalDraws,
        totalLosses: el.totalLosses,
        goalsFavor: el.goalsFavor,
        goalsOwn: el.goalsOwn,
        goalsBalance: el.goalsBalance,
        efficiency: Number(Number(el.efficiency).toFixed(2)).toString(),
      }));
      return res.status(StatusCode.OK).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}
