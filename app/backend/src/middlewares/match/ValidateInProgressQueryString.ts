import { HttpStatusCode } from '../../utils';

class ValidateInProgressQueryString {
  private httpStatusCode = HttpStatusCode;

  handle(inProgress: string | undefined) {
    if (!inProgress || !inProgress.length) {
      return undefined;
    }

    // This regex allows any letter to be uppercase and lowercase
    // created by: me :)
    if (!inProgress.match(/^(true|false)$/i)) {
      return {
        httpStatusCode: this.httpStatusCode.BadRequest,
        result: { message: '\'inProgress\' must have \'true\' or \'false\'' },
      };
    }
  }
}

export default ValidateInProgressQueryString;
