import { ILeaderboardTeam, IMatch } from './interfaces';

const addWinToClub = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  club?: ILeaderboardTeam,
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

const addLossToClub = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  club?: ILeaderboardTeam,
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

const addDrawToClub = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  club?: ILeaderboardTeam,
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

const addWinToLeaderboard = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardTeam[],
)
: ILeaderboardTeam[] => {
  const updatedLeaderboard = [...leaderboard] as ILeaderboardTeam[];
  const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
  const club = updatedLeaderboard[clubIndex] as ILeaderboardTeam;
  if (club) {
    updatedLeaderboard[clubIndex] = addWinToClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addWinToClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

const addLossToLeaderboard = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardTeam[],
)
: ILeaderboardTeam[] => {
  const updatedLeaderboard = [...leaderboard] as ILeaderboardTeam[];
  const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
  const club = updatedLeaderboard[clubIndex] as ILeaderboardTeam;
  if (club) {
    updatedLeaderboard[clubIndex] = addLossToClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addLossToClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

const addDrawToLeaderboard = (
  clubName: string,
  clubGoals: number,
  adversaryGoals: number,
  leaderboard: ILeaderboardTeam[],
)
: ILeaderboardTeam[] => {
  const updatedLeaderboard = [...leaderboard] as ILeaderboardTeam[];
  const clubIndex = updatedLeaderboard.findIndex((team) => team.name === clubName);
  const club = updatedLeaderboard[clubIndex] as ILeaderboardTeam;
  if (club) {
    updatedLeaderboard[clubIndex] = addDrawToClub(
      clubName,
      clubGoals,
      adversaryGoals,
      club,
    );
  } else updatedLeaderboard.push(addDrawToClub(clubName, clubGoals, adversaryGoals));
  return updatedLeaderboard;
};

const calculateLeaderboardHome = (matchs: IMatch[]) => {
  let leaderboard = [] as ILeaderboardTeam[];
  matchs.forEach((match) => {
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (homeTeamGoals > awayTeamGoals) {
      leaderboard = addWinToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (homeTeamGoals < awayTeamGoals) {
      leaderboard = addLossToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};

const calculateLeaderboardAway = (matchs: IMatch[]) => {
  let leaderboard = [] as ILeaderboardTeam[];
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addWinToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};

const calculateLeaderboardAll = (matchs: IMatch[]) => {
  let leaderboard = [] as ILeaderboardTeam[];
  matchs.forEach((match) => {
    const awayClubName = match.awayClub.clubName;
    const homeClubName = match.homeClub.clubName;
    const { homeTeamGoals, awayTeamGoals } = match;
    if (awayTeamGoals > homeTeamGoals) {
      leaderboard = addWinToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addLossToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else if (awayTeamGoals < homeTeamGoals) {
      leaderboard = addLossToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addWinToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    } else {
      leaderboard = addDrawToLeaderboard(awayClubName, awayTeamGoals, homeTeamGoals, leaderboard);
      leaderboard = addDrawToLeaderboard(homeClubName, homeTeamGoals, awayTeamGoals, leaderboard);
    }
  });
  return leaderboard;
};

const sortLeaderboard = (leaderboard: ILeaderboardTeam[]) => leaderboard.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || a.goalsOwn - b.goalsOwn);

export {
  calculateLeaderboardHome, calculateLeaderboardAway,
  calculateLeaderboardAll, sortLeaderboard,
};
