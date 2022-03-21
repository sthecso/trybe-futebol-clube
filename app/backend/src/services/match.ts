import {
  MatchRepository,
  ClubRepository,
} from '../repositories';

import {
  IMatchScore,
  IMatchCreate,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

import * as messages from '../utils/messages';

import ConflictError from './errors/Conflict';
import NotFoundError from './errors/NotFound';
import UnauthorizedError from './errors';

class MatchService {
  public static async findAll(inProgress: boolean) {
    const result: IMatchComplete[] = await MatchRepository
      .findAll(inProgress);

    return result;
  }

  public static async findById(id: IMatch['id']) {
    const result: IMatchComplete = await MatchRepository
      .findById(id);

    const err = new NotFoundError(messages.match.notFound);

    if (!result) throw err;

    return result;
  }

  public static async create(newMatch: IMatchCreate) {
    const { homeTeam: homeTeamId, awayTeam: awayTeamId } = newMatch;

    const conflictErr = new ConflictError(messages.match.teams.conflict);
    const unauthErr = new UnauthorizedError(messages.match.teams.notFound);

    if (homeTeamId === awayTeamId) throw conflictErr;

    const clubsExist = await ClubRepository.checkClubs(newMatch);
    if (!clubsExist) throw unauthErr;

    const result: IMatch = await MatchRepository.create(newMatch);

    return result;
  }

  public static async finish(matchId: IMatch['id']) {
    const match = await MatchRepository.findById(matchId);

    const unauthErr = new UnauthorizedError(messages.match.notFound);

    if (!match) throw unauthErr;

    const result = await MatchRepository.finish(matchId);

    return result;
  }

  public static async edit(
    matchId: IMatch['id'],
    updatedScore: IMatchScore,
  ) {
    const match = await MatchRepository.findById(matchId);

    const unauthErr = new UnauthorizedError(messages.match.notFound);

    if (!match) throw unauthErr;

    const result = await MatchRepository.edit(matchId, updatedScore);

    return result;
  }
}

export default MatchService;
