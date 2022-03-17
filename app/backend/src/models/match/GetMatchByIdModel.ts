import Match from '../../database/models/Matchs';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IMatchResponse } from '../../interfaces/match';

class GetMatchByIdModel {
  private matchEntity = Match;

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle(id: number): Promise<IMatchResponse | ErrorCatcher> {
    const match = await this.matchEntity.findByPk(id);

    if (!match) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotFound,
        'Has no match with this id',
      );
    }

    return match.get({ plain: true });
  }
}

export default GetMatchByIdModel;
