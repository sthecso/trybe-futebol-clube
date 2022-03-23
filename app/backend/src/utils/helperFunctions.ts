import { ILeaderboardObject, ILeaderboardTeam, IMatch } from './interfaces';

const addWinToLeaderboard = (
  club: ILeaderboardTeam,
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
) => ({
  name: clubName,
  totalPoints: (club ? club.totalPoints + 3 : 3),
  totalGames: (club ? club.totalGames + 1 : 1),
  totalVictories: (club ? club.totalVictories + 1 : 1),
  totalDraws: (club ? club.totalDraws : 0),
  totalLosses: (club ? club.totalLosses : 0),
  goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
  goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
  goalsBalance: (club
    ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
    : clubGoals - adversaryGoals),
  efficiency: Math.round((club ? ((club.totalPoints + 3)
    / ((club.totalGames + 1) * 3)) * 100 : 100) * 100) / 100,
});

const addLossToLeaderboard = (
  club: ILeaderboardTeam,
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
) => ({
  name: clubName,
  totalPoints: (club ? club.totalPoints : 0),
  totalGames: (club ? club.totalGames + 1 : 1),
  totalVictories: (club ? club.totalVictories : 0),
  totalDraws: (club ? club.totalDraws : 0),
  totalLosses: (club ? club.totalLosses + 1 : 1),
  goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
  goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
  goalsBalance: (club
    ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
    : clubGoals - adversaryGoals),
  efficiency: Math.round((club ? (club.totalPoints
    / ((club.totalGames + 1) * 3)) * 100 : 0) * 100) / 100,
});

const addDrawToLeaderboard = (
  club: ILeaderboardTeam,
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
) => ({
  name: clubName,
  totalPoints: (club ? club.totalPoints + 1 : 1),
  totalGames: (club ? club.totalGames + 1 : 1),
  totalVictories: (club ? club.totalVictories : 0),
  totalDraws: (club ? club.totalDraws + 1 : 1),
  totalLosses: (club ? club.totalLosses : 0),
  goalsFavor: (club ? club.goalsFavor + clubGoals : clubGoals),
  goalsOwn: (club ? club.goalsOwn + adversaryGoals : adversaryGoals),
  goalsBalance: (club
    ? ((club.goalsFavor + clubGoals) - (club.goalsOwn + adversaryGoals))
    : clubGoals - adversaryGoals),
  efficiency: Math.round((club ? ((club.totalPoints + 1)
    / ((club.totalGames + 1) * 3)) * 100 : 33.33) * 100) / 100,
});

const addVictoryToTeam = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardObject,
)
: ILeaderboardObject => {
  const updatedLeaderboard = { ...leaderboard } as ILeaderboardObject;
  const club = updatedLeaderboard[clubName];
  updatedLeaderboard[clubName] = addWinToLeaderboard(club, clubName, clubGoals, adversaryGoals);
  return updatedLeaderboard;
};

const addLossToTeam = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardObject,
)
: ILeaderboardObject => {
  const updatedLeaderboard = { ...leaderboard } as ILeaderboardObject;
  const club = updatedLeaderboard[clubName];
  updatedLeaderboard[clubName] = addLossToLeaderboard(club, clubName, clubGoals, adversaryGoals);
  return updatedLeaderboard;
};

const addDrawToTeam = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardObject,
)
: ILeaderboardObject => {
  const updatedLeaderboard = { ...leaderboard } as ILeaderboardObject;
  const club = updatedLeaderboard[clubName];
  updatedLeaderboard[clubName] = addDrawToLeaderboard(club, clubName, clubGoals, adversaryGoals);
  return updatedLeaderboard;
};

const calculateLeaderboardHome = (matchs: IMatch[]) => {
  let leaderboard = {} as ILeaderboardObject;
  matchs.forEach((match) => {
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      leaderboard = addVictoryToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (homeTeamGoals < awayTeamGoals) {
      leaderboard = addLossToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};

const calculateLeaderboardAway = (matchs: IMatch[]) => {
  let leaderboard = {} as ILeaderboardObject;
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addVictoryToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};
const calculateLeaderboardAll = (matchs: IMatch[]) => {
  let leaderboard = {} as ILeaderboardObject;
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addVictoryToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addLossToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addVictoryToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToTeam(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addDrawToTeam(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};

const sortLeaderboard = (leaderboard: ILeaderboardTeam[]) => leaderboard.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);

export { calculateLeaderboardHome, calculateLeaderboardAway,
  calculateLeaderboardAll, sortLeaderboard };
