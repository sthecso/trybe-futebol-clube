import { MatchRepository } from '../../database/repositories';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IMatchResponse } from '../../interfaces/match';

class GetMatchByIdModel {
  private matchRepository = new MatchRepository();

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle(id: number): Promise<IMatchResponse | ErrorCatcher> {
    const match = await this.matchRepository.findOne({ where: { id } });

    if (!match) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotFound,
        'Has no match with this id',
      );
    }

    return match;
  }
}

export default GetMatchByIdModel;
