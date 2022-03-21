import { GetClubByIdService } from '../../services/club';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class GetClubByIdController {
  private getClubByIdService = new GetClubByIdService();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  constructor() {
    this.handle = this.handle.bind(this);
  }

  async handle(id: string) {
    const club = await this.getClubByIdService.handle(id);

    if (club instanceof this.ErrorCatcher) {
      return {
        httpStatusCode: club.httpStatusCode,
        result: { message: club.message },
      };
    }

    return {
      httpStatusCode: this.httpStatusCode.Ok,
      result: club,
    };
  }
}

export default GetClubByIdController;
