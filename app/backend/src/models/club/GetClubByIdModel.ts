import { ErrorCatcher, HttpStatusCode } from '../../utils';

import { ClubRepository } from '../../database/repositories';

class GetClubByIdModel {
  private clubRepository = new ClubRepository();

  private httpStatusCode = HttpStatusCode;

  private ErrorCatcher = ErrorCatcher;

  async handle(id: number) {
    const club = await this.clubRepository.findById(id);

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
