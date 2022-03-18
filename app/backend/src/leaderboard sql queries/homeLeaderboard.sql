SELECT 
    c.club_name AS name,
    SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS totalPoints,
    COUNT(*) AS totalGames,
    SUM(m.home_team_goals > m.away_team_goals) AS totalVictories,
    SUM(m.home_team_goals = m.away_team_goals) AS totalDraws,
    SUM(m.home_team_goals < m.away_team_goals) AS totalLosses,
    SUM(m.home_team_goals) AS goalsFavor,
    SUM(m.away_team_goals) AS goalsOwn,
    (SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS goalsBalance,
    CAST(ROUND((SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) / (COUNT(*) * 3) * 100), 2) AS CHAR) + 0 AS totalPoints
FROM
    clubs AS c
        JOIN
    matchs AS m ON m.home_team = c.id
    WHERE m.in_progress = FALSE
GROUP BY name
ORDER BY totalPoints DESC , totalVictories DESC , goalsBalance DESC , goalsFavor DESC , goalsOwn DESC

