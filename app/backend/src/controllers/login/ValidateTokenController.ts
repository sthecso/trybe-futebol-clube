import { IUserResponse } from '../../interfaces/login';

import { HttpStatusCode } from '../../utils';

class ValidateTokenController {
  private httpStatusCode = HttpStatusCode;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(jwtDecoded: IUserResponse) {
    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: jwtDecoded.role,
    };
  }
}

export default ValidateTokenController;
