import { EditMatchByIdModel } from '../../models/match';

import { IMatchPatchRequest } from '../../interfaces/match';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class EditMatchByIdService {
  private editMatchByIdModel = new EditMatchByIdModel();

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
    matchData: IMatchPatchRequest,
    id: number,
  ): Promise<ErrorCatcher | void> {
    let error = {};

    Object.entries(matchData).forEach((entries) => {
      const verify = this.verifyIsNumber(entries[1], entries[0]);
      if (verify instanceof ErrorCatcher) {
        error = verify;
      }
    });

    if (error instanceof ErrorCatcher) {
      return error;
    }

    await this.editMatchByIdModel.handle(matchData, id);
  }
}

export default EditMatchByIdService;
