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

import NotFoundError from './errors/NotFound';
import UnprocessableError from './errors/Unprocessable';
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

  public static async validateNewMatch(newMatch: IMatchCreate) {
    const { homeTeam: homeTeamId, awayTeam: awayTeamId } = newMatch;

    const conflictErr = new UnauthorizedError(messages.match.teams.conflict);

    if (homeTeamId === awayTeamId) throw conflictErr;

    const notFoundErr = new UnauthorizedError(
      messages.match.teams.notFound,
    );

    const homeTeam = await ClubRepository.findById(homeTeamId);
    const awayTeam = await ClubRepository.findById(awayTeamId);

    if (!homeTeam || !awayTeam) throw notFoundErr;
  }

  public static async create(newMatch: IMatchCreate) {
    await this.validateNewMatch(newMatch);

    const result: IMatch = await MatchRepository.create(newMatch);

    return result;
  }

  public static async finish(matchId: IMatch['id']) {
    const match = await MatchRepository.findById(matchId);

    const unauthErr = new UnauthorizedError(messages.match.notFound);

    if (!match) throw unauthErr;

    const result: boolean = await MatchRepository.finish(matchId);

    const unprocessErr = new UnprocessableError(messages.match.patchFail);

    if (!result) throw unprocessErr;

    return messages.match.finished;
  }

  public static async edit(
    matchId: IMatch['id'],
    updatedScore: IMatchScore,
  ) {
    const match = await MatchRepository.findById(matchId);

    const unauthErr = new UnauthorizedError(messages.match.notFound);

    if (!match) throw unauthErr;

    const result: boolean = await MatchRepository
      .edit(matchId, updatedScore);

    const unprocessErr = new UnprocessableError(messages.match.patchFail);

    if (!result) throw unprocessErr;

    return messages.match.updated;
  }
}

export default MatchService;
