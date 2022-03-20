import Clubs from '../database/models/ClubModel';
import Matchs from '../database/models/MatchModel';
import throwError from './error';

interface IMatchDate {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean
}

const findAllMatchs = async (param: string) => {
  if (param === 'true' || param === 'false') {
    const allMatchsProgressTrueOrFalse = await
    Matchs.findAll({
      where: { inProgress: JSON.parse(param) },
      include: [
        { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
        { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return allMatchsProgressTrueOrFalse;
  }
  const allMatchs = await Matchs.findAll({
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ],
  });
  return allMatchs;
};

const createMatch = async (matchDate: object) => {
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = matchDate as IMatchDate;
  const createdMatch = await Matchs.create({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress,
  });

  return createdMatch;
};

interface IFoundMatch {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

const findMatchById = async (id: number) => {
  const foundMatch = await Matchs.findOne({ where: { id } }) as IFoundMatch;
  if (!foundMatch) return throwError('Match not found', '404');

  return {
    id: foundMatch.id,
    homeTeam: foundMatch.homeTeam,
    homeTeamGoals: foundMatch.homeTeamGoals,
    awayTeam: foundMatch.awayTeam,
    awayTeamGoals: foundMatch.awayTeamGoals,
    inProgress: foundMatch.inProgress,
  };
};

const updateInProgress = async (id: number) => {
  await Matchs.update({ inProgress: false }, { where: { id } });
  const updated = await findMatchById(id);

  return updated;
};

const updateMatchResult = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
  await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  const updated = await findMatchById(id);

  return updated;
};

const findClubById = async (id: number) => {
  const result = await Clubs.findOne({ where: { id } });

  return result;
};

export {
  findAllMatchs,
  createMatch,
  updateInProgress,
  updateMatchResult,
  findClubById,
};
