// This query only brings the games that have already ended
// using matches played at home as a basis
export const leaderboardsHomeQuery = `
  SELECT 
    c.club_name AS name,
      CAST(SUM(IF(m.home_team_goals > m.away_team_goals,
        3,
          IF(m.home_team_goals < m.away_team_goals,
            0,
          1))) AS UNSIGNED) AS totalPoints,
    COUNT(c.club_name) AS totalGames,
    CAST(SUM(IF(m.home_team_goals > m.away_team_goals,
      1,
    0)) AS UNSIGNED) AS totalVictories,
    CAST(SUM(IF(m.home_team_goals = m.away_team_goals,
      1,
    0)) AS UNSIGNED) AS totalDraws,
    CAST(SUM(IF(m.home_team_goals < m.away_team_goals,
      1,
    0)) AS UNSIGNED) AS totalLosses,
    CAST(SUM(m.home_team_goals) AS UNSIGNED) AS goalsFavor,
    CAST(SUM(m.away_team_goals) AS UNSIGNED) AS goalsOwn,
    CAST(SUM(m.home_team_goals) - SUM(m.away_team_goals) AS SIGNED) AS goalsBalance,
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

// This query only brings the games that have already ended
// using away matches as a basis
export const leaderboardsAwayQuery = `
  SELECT 
    c.club_name AS name,
      CAST(SUM(IF(m.away_team_goals > m.home_team_goals,
        3,
          IF(m.away_team_goals < m.home_team_goals,
            0,
          1))) AS UNSIGNED) AS totalPoints,
    COUNT(c.club_name) AS totalGames,
    CAST(SUM(IF(m.away_team_goals > m.home_team_goals,
      1,
    0)) AS UNSIGNED) AS totalVictories,
    CAST(SUM(IF(m.away_team_goals = m.home_team_goals,
      1,
    0)) AS UNSIGNED) AS totalDraws,
    CAST(SUM(IF(m.away_team_goals < m.home_team_goals,
      1,
    0)) AS UNSIGNED) AS totalLosses,
    CAST(SUM(m.away_team_goals) AS UNSIGNED) AS goalsFavor,
    CAST(SUM(m.home_team_goals) AS UNSIGNED) AS goalsOwn,
    CAST(SUM(m.away_team_goals) - SUM(m.home_team_goals) AS SIGNED) AS goalsBalance,
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
