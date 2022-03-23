import Clubs from '../../models/Clubs';
import Matchs from '../../models/Matchs';
import { ClubGols, BaseLboard, ClubsAndMatchs } from '../../../helpers/Interfaces';

const INITIAL_NUMBER = 0;

function endCalc(matchs: any, object: BaseLboard) {
  const nObj = object;
  matchs.forEach((match: any) => {
    if (match.golsFeitos > match.golsTomados) { nObj.totalPoints += 3; nObj.totalVictories += 1; }
    if (match.golsFeitos === match.golsTomados) { nObj.totalPoints += 1; nObj.totalDraws += 1; }
    if (match.golsFeitos < match.golsTomados) nObj.totalLosses += 1;
    nObj.goalsFavor += match.golsFeitos;
    nObj.goalsOwn += match.golsTomados;
  });
  nObj.totalGames = matchs.length;
  return nObj;
}

function calculatePoints(matchs: ClubGols[]) {
  const baseLboard = {
    name: '',
    totalVictories: INITIAL_NUMBER,
    goalsOwn: INITIAL_NUMBER,
    totalLosses: INITIAL_NUMBER,
    totalDraws: INITIAL_NUMBER,
    goalsFavor: INITIAL_NUMBER,
    totalPoints: INITIAL_NUMBER,
    goalsBalance: INITIAL_NUMBER,
    totalGames: INITIAL_NUMBER,
    efficiency: INITIAL_NUMBER,
  };
  const endLeaderboard = endCalc(matchs, baseLboard);
  endLeaderboard.goalsBalance = endLeaderboard.goalsFavor - endLeaderboard.goalsOwn;
  endLeaderboard.efficiency = Number(
    ((endLeaderboard.totalPoints / (matchs.length * 3)) * 100).toFixed(2),
  );
  return endLeaderboard;
}

function filterClubToReturnToUser(club: ClubsAndMatchs[]) {
  const endLeaderboard = club.map((clubObject) => {
    const leaderboard = calculatePoints(clubObject.matchs);
    leaderboard.name = clubObject.name;
    return leaderboard;
  });
  return endLeaderboard;
}
function sortGoalsOwn(a: BaseLboard, b: BaseLboard) {
  if (a.goalsOwn > b.goalsOwn) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;
  return 0;
}

function sortGoalsFavor(a: BaseLboard, b: BaseLboard) {
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;
  return sortGoalsOwn(a, b);
}

function sortGoalsBalance(a: BaseLboard, b: BaseLboard) {
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;
  return sortGoalsFavor(a, b);
}

function sortVictories(a: BaseLboard, b: BaseLboard) {
  if (a.totalVictories > b.totalVictories) return -1;
  if (a.totalVictories < b.totalVictories) return 1;
  return sortGoalsBalance(a, b);
}

function sortPoints(a: BaseLboard, b: BaseLboard) {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  return sortVictories(a, b);
}

function endLboard(clubsAndMatchs: any) {
  const arrayToSetLeaderboard = [] as any;
  clubsAndMatchs.forEach((club: any) => {
    const n = { name: club.dataValues.clubName, matchs: [] as ClubGols[] };
    club.dataValues.partidasCasa.forEach((match: any) => {
      const matchs = match.dataValues; n.matchs.push(matchs);
    });
    arrayToSetLeaderboard.push(n);
  });
  const responseLeaderboard = filterClubToReturnToUser(arrayToSetLeaderboard);
  responseLeaderboard.sort(sortPoints);
  return responseLeaderboard;
}

async function getLeaderboardService() {
  const clubsAndMatchs = await Clubs.findAll({
    attributes: ['clubName'],
    include: [{ model: Matchs,
      as: 'partidasCasa',
      attributes: [['home_team_goals', 'golsFeitos'], ['away_team_goals', 'golsTomados']],
      where: { inProgress: false },
    }],
  }) as any;
  return endLboard(clubsAndMatchs);
}

export default getLeaderboardService;
