/* eslint-disable @typescript-eslint/no-explicit-any */
import Leaderboard from '../../utils/LeaderboardObject';
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
  return newObject;
}

function calculatePoints(matchs: ClubGols[]) {
  const baseLeaderboard = {
    name: '',
    totalPoints: 0,
    totalVictories: 0,
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
  console.log('O filtro por gols feitos não foi realizado, fazendo filtro por gols tomados');
  if (a.goalsOwn > b.goalsOwn) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;
  return 0;
}

function sortByGoalsFavor(a: BaseLeaderboard, b: BaseLeaderboard) {
  console.log('O filtro por KDA não foi realizado, fazendo filtro por gols feitos');
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;
  return sortByGoalsOwn(a, b);
}

function sortByGoalsBalance(a: BaseLeaderboard, b: BaseLeaderboard) {
  console.log('O filtro por vitórias não foi realizado, fazendo filtro por K/D/A de gols');
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;
  return sortByGoalsFavor(a, b);
}

function sortByVictories(a: BaseLeaderboard, b: BaseLeaderboard) {
  console.log('O filtro por pontos não foi realizado, fazendo filtro por vitórias');
  if (a.totalVictories > b.totalVictories) return -1;
  if (a.totalVictories < b.totalVictories) return 1;
  return sortByGoalsBalance(a, b);
}

function sortByPoints(a: BaseLeaderboard, b: BaseLeaderboard) {
  console.log('Fazendo o filtro por pontos.');
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  return sortByVictories(a, b);
}

async function getLeaderboardService() {
  const clubsAndMatchs = await Clubs.findAll({
    include: [{
      model: Matchs,
      attributes: [['home_team_goals', 'golsFeitos'], ['away_team_goals', 'golsTomados']],
      where: { inProgress: false },
    }],
  });
  const arrayToSetLeaderboard = [] as any;
  clubsAndMatchs.forEach((club: any) => {
    const n = { name: club.dataValues.clubName, matchs: [] as ClubGols[] };
    club.dataValues.Matchs.forEach((match: any) => {
      const matchs = match.dataValues; n.matchs.push(matchs);
    });
    arrayToSetLeaderboard.push(n);
  });
  const responseLeaderboard = filterClubToReturnToUser(arrayToSetLeaderboard);
  await responseLeaderboard.sort(sortByPoints);
  return Leaderboard;
}

export default getLeaderboardService;
