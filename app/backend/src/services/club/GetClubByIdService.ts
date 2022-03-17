import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { GetClubByIdModel } from '../../models/club';

class GetClubByIdService {
  private getClubByIdModel = new GetClubByIdModel();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  validateId(id: string): ErrorCatcher | void {
    if (Number.isNaN(Number(id))) {
      return new this.ErrorCatcher(
        this.httpStatusCode.BadRequest,
        'Id must be a number',
      );
    }
  }

  async handle(id: string) {
    const isNotValidId = this.validateId(id);
    if (isNotValidId) {
      return isNotValidId;
    }

    const club = await this.getClubByIdModel.handle(Number(id));

    return club;
  }
}

export default GetClubByIdService;
