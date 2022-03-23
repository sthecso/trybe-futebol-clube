import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { EditMatchByIdService } from '../../services/match';

class EditMatchByIdController {
  private editMatchByIdService = new EditMatchByIdService();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  async handle(matchData: object, id: string) {
    const editedMatch = await this.editMatchByIdService.handle(matchData, id);

    if (editedMatch instanceof this.ErrorCatcher) {
      return {
        httpStatusCode: editedMatch.httpStatusCode,
        result: { message: editedMatch.message },
      };
    }

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: editedMatch,
    };
  }
}

export default EditMatchByIdController;
