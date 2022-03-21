import { ErrorCatcher, HttpStatusCode } from '../../utils';

import {
  FinishMatchModel,
  GetMatchByIdModel,
} from '../../models/match';

class FinishMatchService {
  private finishMatchModel = new FinishMatchModel();

  private getMatchByIdModel = new GetMatchByIdModel();

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  validateId(id: string): ErrorCatcher | void {
    if (Number.isNaN(Number(id))) {
      return new this.ErrorCatcher(
        this.httpStatusCode.BadRequest,
        'id must be a number',
      );
    }
  }

  async handle(id: string) {
    const verifyId = this.validateId(id);

    if (verifyId instanceof this.ErrorCatcher) return verifyId;

    const match = await this.getMatchByIdModel.handle(Number(id));

    if (match instanceof this.ErrorCatcher) {
      return match;
    }

    if (match.inProgress === false) {
      return new this.ErrorCatcher(
        this.httpStatusCode.Conflict,
        'This match is already finished',
      );
    }

    await this.finishMatchModel.handle(Number(id));
  }
}

export default FinishMatchService;
