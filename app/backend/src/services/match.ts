import { MatchRepository } from '../repositories';

import {
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

    const homeTeam = await MatchRepository.findById(homeTeamId);
    const awayTeam = await MatchRepository.findById(awayTeamId);

    if (!homeTeam || !awayTeam) throw notFoundErr;
    if (homeTeamId === awayTeamId) throw conflictErr;

    const result: IMatch = await MatchRepository
      .create(newMatch);

    return result;
  }
}

export default MatchService;
