SELECT 
    c.club_name AS name,
    CAST(SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) AS CHAR) + 0 AS totalPoints,
    COUNT(*) AS totalGames,
    CAST(SUM(m.away_team_goals > m.home_team_goals) AS CHAR) + 0 AS totalVictories,
    CAST(SUM(m.away_team_goals = m.home_team_goals) AS CHAR) + 0 AS totalDraws,
    CAST(SUM(m.away_team_goals < m.home_team_goals) AS CHAR) + 0 AS totalLosses,
    CAST(SUM(m.away_team_goals) AS CHAR) + 0 AS goalsFavor,
    CAST(SUM(m.home_team_goals) AS CHAR) + 0 AS goalsOwn,
    CAST((SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS CHAR) +0 AS goalsBalance,
    CAST(ROUND((SUM(CASE
        WHEN m.away_team_goals > m.home_team_goals THEN 3
        WHEN m.away_team_goals = m.home_team_goals THEN 1
        ELSE 0
    END) / (COUNT(*) * 3) * 100), 2) AS CHAR) + 0 AS efficiency
FROM
    clubs AS c
        JOIN
    matches AS m ON m.away_team = c.id
    WHERE m.in_progress = FALSE
GROUP BY name
ORDER BY totalPoints DESC , totalVictories DESC , goalsBalance DESC , goalsFavor DESC , goalsOwn DESC