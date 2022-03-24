import { IClub } from './clubs';

interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number;
}

interface IMatchs {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  homeClub: {
    clubName: string
  },
  awayClub: {
    clubName: string
  }
}

interface IDataPoints {
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

const thisTeam = (arrayMatchs: [], searchedTeam: string) => (arrayMatchs.filter((each: IMatchs) =>
  each.homeClub.clubName === searchedTeam || each.awayClub.clubName === searchedTeam));

const getTotalVictories = (arrayMatchs: [], searchedTeam: string) => {
  const thisTeamResult = thisTeam(arrayMatchs, searchedTeam);
  let result = 0;
  thisTeamResult.forEach((each: IMatchs) => {
    if (each.homeClub.clubName === searchedTeam && each.homeTeamGoals > each.awayTeamGoals) {
      result += 1;
    }
  });
  return result;
};

const getTotalDraws = (arrayMatchs: [], searchedTeam: string) => {
  const thisTeamResult = thisTeam(arrayMatchs, searchedTeam);
  let result = 0;
  thisTeamResult.forEach((each: IMatchs) => {
    if (each.homeClub.clubName === searchedTeam && each.homeTeamGoals === each.awayTeamGoals) {
      result += 1;
    }
  });
  return result;
};

const getTotalLoss = (arrayMatchs: [], searchedTeam: string) => {
  const thisTeamResult = thisTeam(arrayMatchs, searchedTeam);
  let result = 0;
  thisTeamResult.forEach((each: IMatchs) => {
    if (each.homeClub.clubName === searchedTeam && each.homeTeamGoals < each.awayTeamGoals) {
      result += 1;
    }
  });
  return result;
};

const getGoalsFavor = (arrayMatchs: [], searchedTeam: string) => {
  const thisTeamResult = thisTeam(arrayMatchs, searchedTeam);
  let result = 0;
  thisTeamResult.forEach((each: IMatchs) => {
    if (each.homeClub.clubName === searchedTeam) {
      result += each.homeTeamGoals;
    }
  });
  return result;
};

const getGoalsOwn = (arrayMatchs: [], searchedTeam: string) => {
  const thisTeamResult = thisTeam(arrayMatchs, searchedTeam);
  let result = 0;
  thisTeamResult.forEach((each: IMatchs) => {
    if (each.homeClub.clubName === searchedTeam) {
      result += each.awayTeamGoals;
    }
  });
  return result;
};

const getEfficiency = (data: IDataPoints) => {
  const { totalVictories, totalDraws, totalLosses } = data;
  const totalPoints = (totalVictories * 3) + totalDraws;
  const totalGames = totalVictories + totalDraws + totalLosses;
  const result = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

  return result;
};

const receiveData = (arrayMatchs: [], clubName: string) => {
  const totalVictories = getTotalVictories(arrayMatchs, clubName);
  const totalDraws = getTotalDraws(arrayMatchs, clubName);
  const totalLosses = getTotalLoss(arrayMatchs, clubName);

  return { totalVictories, totalDraws, totalLosses };
};

const getLeaderboard = async (arrayClubs: IClub[], arrayMatchs: []) => {
  const leaderBoard: ILeaderboard[] = [];
  arrayClubs.forEach((eachObject) => {
    const data = receiveData(arrayMatchs, eachObject.clubName);
    const gF = getGoalsFavor(arrayMatchs, eachObject.clubName);
    const gO = getGoalsOwn(arrayMatchs, eachObject.clubName);
    leaderBoard.push({ name: eachObject.clubName,
      totalPoints: (data.totalVictories * 3) + data.totalDraws,
      totalGames: data.totalVictories + data.totalLosses + data.totalDraws,
      totalVictories: data.totalVictories,
      totalDraws: data.totalDraws,
      totalLosses: data.totalLosses,
      goalsFavor: gF,
      goalsOwn: gO,
      goalsBalance: gF - gO,
      efficiency: getEfficiency(data),
    });
  });
  return leaderBoard;
};

export default getLeaderboard;
