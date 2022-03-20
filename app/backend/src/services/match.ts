import {
  MatchRepository,
  ClubRepository,
} from '../repositories';

import {
  ITeamGoals,
  IMatchSimple,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

import * as messages from '../utils/messages';

import ConflictError from './errors/Conflict';
import NotFoundError from './errors/NotFound';

class MatchService {
  public static async findAll(inProgress: boolean) {
    const result: IMatchComplete[] = await MatchRepository
      .findAll(inProgress);

    return result;
  }

  public static async create(newMatch: IMatchSimple) {
    const { homeTeam: homeTeamId, awayTeam: awayTeamId } = newMatch;

    const notFoundErr = new NotFoundError(messages.match.teams.notFound);
    const conflictErr = new ConflictError(messages.match.teams.conflict);

    if (homeTeamId === awayTeamId) throw conflictErr;

    const homeTeam = await ClubRepository.findById(homeTeamId);
    const awayTeam = await ClubRepository.findById(awayTeamId);

    if (!homeTeam || !awayTeam) throw notFoundErr;

    const result: IMatch = await MatchRepository
      .create(newMatch);

    return result;
  }

  public static async edit(id: IMatch['id'], updatedScore: ITeamGoals) {
    const team = await ClubRepository.findById(id);

    const notFoundErr = new NotFoundError(messages.match.teams.notFound);

    if (!team) throw notFoundErr;

    const result = await MatchRepository
      .edit(id, updatedScore);

    return result;
  }
}

export default MatchService;
