import { IMatchPostRequest } from '../../interfaces/match';

import { HttpStatusCode } from '../../utils';

class ValidateInProgressBodyRequest {
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(requestBody: IMatchPostRequest) {
    const { inProgress } = requestBody;

    if (typeof inProgress !== 'boolean') {
      return {
        httpStatusCode: this.httpStatusCode.NotAuthorized,
        result: { message: 'There is no team with such id!' },
      };
    }
  }
}

export default ValidateInProgressBodyRequest;
