import { ErrorCatcher, HttpStatusCode } from '../../utils';

import Club from '../../database/models/Club';

class GetClubByIdModel {
  private clubEntity = Club;

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  async handle(id: number) {
    const club = await this.clubEntity.findByPk(id);

    if (!club) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotFound,
        'Has no club with this id',
      );
    }

    return club;
  }
}

export default GetClubByIdModel;
