import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { GetClubByIdModel } from '../../models/club';

class GetClubByIdService {
  private getClubByIdModel = new GetClubByIdModel();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  validateId(id: string): string | void {
    if (isNaN(Number(id))) {
      return 'Id must be a number';
    }
  }

  async handle(id: string) {
    const isNotValidId = this.validateId(id);
    if (isNotValidId) {
      return new this.ErrorCatcher(
        this.httpStatusCode.BadRequest,
        isNotValidId,
      );
    }

    const club = await this.getClubByIdModel.handle(Number(id));

    return club;
  }
}

export default GetClubByIdService;
