import {
  MatchRepository,
  ClubRepository,
} from '../repositories';

import {
  InProgressQ,
  IMatchScore,
  IMatchCreate,
  IMatch,
  IMatchComplete,
} from '../utils/interfaces';

import * as messages from '../utils/messages';

import NotFoundError from './errors/NotFound';
import UnauthorizedError from './errors';
import BadRequestError from './errors/BadRequest';

class MatchService {
  public static async findAll(inProgressQ: InProgressQ) {
    const result: IMatchComplete[] = await MatchRepository
      .findAll(inProgressQ);

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

    const unauthErr = new UnauthorizedError(messages.match.teams.conflict);

    if (homeTeamId === awayTeamId) throw unauthErr;

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

    const notFoundErr = new NotFoundError(messages.match.notFound);

    if (!match) throw notFoundErr;

    const result: boolean = await MatchRepository.finish(matchId);

    const badReqErr = new BadRequestError(messages.match.patchFail);

    if (!result) throw badReqErr;

    return messages.match.finished;
  }

  public static async edit(
    matchId: IMatch['id'],
    updatedScore: IMatchScore,
  ) {
    const match = await MatchRepository.findById(matchId);

    const notFoundErr = new NotFoundError(messages.match.notFound);

    if (!match) throw notFoundErr;

    const result: boolean = await MatchRepository
      .edit(matchId, updatedScore);

    const badReqErr = new BadRequestError(messages.match.patchFail);

    if (!result) throw badReqErr;

    return messages.match.updated;
  }
}

export default MatchService;
