import { EditMatchByIdModel, GetMatchByIdModel } from '../../models/match';

import { IMatchPatchRequest, IMatchResponse } from '../../interfaces/match';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class EditMatchByIdService {
  private editMatchByIdModel = new EditMatchByIdModel();

  private getMatchByIdModel = new GetMatchByIdModel();

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

  async handle(
    matchData: object,
    id: string,
  ): Promise<ErrorCatcher | IMatchResponse> {
    let error = {};

    Object.entries({ ...matchData, id }).forEach((entries) => {
      const verify = this.verifyIsNumber(entries[1], entries[0]);
      if (verify instanceof ErrorCatcher) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcher) {
      return error;
    }

    const validMatchData = matchData as IMatchPatchRequest;

    await this.editMatchByIdModel.handle(validMatchData, Number(id));

    const match = await this.getMatchByIdModel.handle(Number(id));

    return match;
  }
}

export default EditMatchByIdService;
