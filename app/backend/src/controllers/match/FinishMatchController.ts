import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { FinishMatchService } from '../../services/match';

class FinishMatchController {
  private finishMatchService = new FinishMatchService();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  async handle(id: string) {
    const error = await this.finishMatchService.handle(id);

    if (error instanceof this.ErrorCatcher) {
      return {
        httpStatusCode: error.httpStatusCode,
        result: { message: error.message },
      };
    }

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: { message: 'Match was finish' },
    };
  }
}

export default FinishMatchController;
