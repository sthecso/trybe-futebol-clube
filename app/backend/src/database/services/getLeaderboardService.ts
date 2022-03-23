/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseLeaderboard, ClubGols, ClubsAndMatchs } from '../../utils/Interfaces';
import Clubs from '../models/Clubs';
import Matchs from '../models/Matchs';

function finishCalculation(matchs: any, object: BaseLeaderboard) {
  const newObject = object;
  matchs.forEach((match: any) => {
    if (match.golsFeitos > match.golsTomados) {
      newObject.totalPoints += 3; newObject.totalVictories += 1;
    }
    if (match.golsFeitos === match.golsTomados) {
      newObject.totalPoints += 1; newObject.totalDraws += 1;
    }
    if (match.golsFeitos < match.golsTomados) newObject.totalLosses += 1;
    newObject.goalsFavor += match.golsFeitos;
    newObject.goalsOwn += match.golsTomados;
  });
  newObject.totalGames = matchs.length;
  return newObject;
}

function calculatePoints(matchs: ClubGols[]) {
  const baseLeaderboard = {
    name: '',
    totalPoints: 0,
    totalVictories: 0,
    totalGames: 0,
    totalLosses: 0,
    totalDraws: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };
  const finalLeaderboard = finishCalculation(matchs, baseLeaderboard);
  finalLeaderboard.goalsBalance = finalLeaderboard.goalsFavor - finalLeaderboard.goalsOwn;
  finalLeaderboard.efficiency = Number(
    ((finalLeaderboard.totalPoints / (matchs.length * 3)) * 100).toFixed(2),
  );
  return finalLeaderboard;
}

function filterClubToReturnToUser(club: ClubsAndMatchs[]) {
  const finalLeaderboard = club.map((clubObject) => {
    const leaderboard = calculatePoints(clubObject.matchs);
    leaderboard.name = clubObject.name;
    return leaderboard;
  });
  return finalLeaderboard;
}

function sortByGoalsOwn(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.goalsOwn > b.goalsOwn) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;
  return 0;
}

function sortByGoalsFavor(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;
  return sortByGoalsOwn(a, b);
}

function sortByGoalsBalance(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;
  return sortByGoalsFavor(a, b);
}

function sortByVictories(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.totalVictories < b.totalVictories) return 1;
  return sortByGoalsBalance(a, b);
}

function sortByPoints(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  return sortByVictories(a, b);
}

function finishLeaderboard(clubsAndMatchs: any) {
  const arrayToSetLeaderboard = [] as any;
  clubsAndMatchs.forEach((club: any) => {
    const n = { name: club.dataValues.clubName, matchs: [] as ClubGols[] };
    club.dataValues.partidasCasa.forEach((match: any) => {
      const matchs = match.dataValues; n.matchs.push(matchs);
    });
    arrayToSetLeaderboard.push(n);
  });
  const responseLeaderboard = filterClubToReturnToUser(arrayToSetLeaderboard);
  responseLeaderboard.sort(sortByPoints);
  return responseLeaderboard;
}

async function getLeaderboardService() {
  const clubsAndMatchs = await Clubs.findAll({
    attributes: ['clubName'],
    include: [{
      model: Matchs,
      as: 'partidasCasa',
      attributes: [
        ['home_team_goals', 'golsFeitos'],
        ['away_team_goals', 'golsTomados'],
      ],
      where: { inProgress: false },
    }],
  }) as any;
  return finishLeaderboard(clubsAndMatchs);
}

export default getLeaderboardService;
