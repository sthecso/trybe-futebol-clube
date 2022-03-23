import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { IMatchPostRequest } from '../../interfaces/match';

class ValidateMatchData {
  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  verifyIsNumber(
    data: string | object | undefined | null | number | boolean,
    field: string,
  ): ErrorCatcher | string | object | undefined | null | number | boolean {
    if (Number.isNaN(Number(data))) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotAuthorized,
        `'${field}' must be a number`,
      );
    }

    return data;
  }

  handle(matchData: IMatchPostRequest) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matchData;

    const objectToValidate = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };

    let error = {};

    Object.entries(objectToValidate).forEach((entries) => {
      const verify = this.verifyIsNumber(entries[1], entries[0]);
      if (verify instanceof ErrorCatcher) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcher) {
      return {
        httpStatusCode: error.httpStatusCode,
        result: { message: error.message },
      };
    }
  }
}

export default ValidateMatchData;
