import { CreateMatchService } from '../../services/match';

import { IMatchPostRequest } from '../../interfaces/match';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class CreateMatchController {
  private createMatchService = new CreateMatchService();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(matchData: IMatchPostRequest) {
    const createdMatch = await this.createMatchService.handle(matchData);

    if (createdMatch instanceof this.ErrorCatcher) {
      return {
        httpStatusCode: createdMatch.httpStatusCode,
        result: { message: createdMatch.message },
      };
    }

    return {
      httpStatusCode: this.httpStatusCode.Created,
      result: createdMatch,
    };
  }
}

export default CreateMatchController;
