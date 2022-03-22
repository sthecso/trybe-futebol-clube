import { BaseLeaderboard, ClubGols, ClubsAndMatchs } from '../../../helpers/Interfaces';
import Clubs from '../../models/Clubs';
import Matchs from '../../models/Matchs';

const INITIAL_VALUES = 0;

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
    totalPoints: INITIAL_VALUES,
    totalVictories: INITIAL_VALUES,
    totalLosses: INITIAL_VALUES,
    totalDraws: INITIAL_VALUES,
    goalsFavor: INITIAL_VALUES,
    goalsOwn: INITIAL_VALUES,
    goalsBalance: INITIAL_VALUES,
    efficiency: INITIAL_VALUES,
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

function sortArray(a: BaseLeaderboard, b: BaseLeaderboard) {
  if (a.totalPoints > b.totalPoints) { return -1; }
  if (a.totalPoints < b.totalPoints) { return 1; }
  if (a.totalVictories > b.totalVictories) { return -1; }
  if (a.totalVictories < b.totalVictories) { return 1; }
  if (a.goalsBalance > b.goalsBalance) { return -1; }
  if (a.goalsBalance < b.goalsBalance) { return 1; }
  if (a.goalsFavor > b.goalsFavor) { return -1; }
  if (a.goalsFavor < b.goalsFavor) { return 1; }
  if (a.goalsOwn > b.goalsOwn) { return -1; }
  if (a.goalsOwn < b.goalsOwn) { return 1; }
  return 0;
}

async function getLeaderboardService() {
  const clubsAndMatchs = await Clubs.findAll({
    include: [{ model: Matchs,
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
  responseLeaderboard.sort(sortArray);
  return responseLeaderboard;
}

export default getLeaderboardService;
