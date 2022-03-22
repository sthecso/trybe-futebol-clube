import { IUserRequest } from '../../interfaces/login';

import { HttpStatusCode, schemaUserRequest } from '../../utils';

class ValidateLoginRequest {
  private httpStatusCode = HttpStatusCode;

  private schemaUserRequest = schemaUserRequest;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(userData: IUserRequest) {
    const { error } = this.schemaUserRequest.validate(userData);

    if (error) {
      return {
        httpStatusCode: this.httpStatusCode.NotAuthorized,
        result: { message: error.message },
      };
    }
  }
}

export default ValidateLoginRequest;
