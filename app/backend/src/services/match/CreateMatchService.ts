import { CreateMatchModel } from '../../models/match';

import { GetClubByIdModel } from '../../models/club';

import { IMatchPostRequest } from '../../interfaces/match';

import { ErrorCatcher, HttpStatusCode } from '../../utils';

class CreateMatchService {
  private createMatchModel = new CreateMatchModel();

  private getClubByIdModel = new GetClubByIdModel();

  private ErrorCatcher = ErrorCatcher;

  private httpStatusCode = HttpStatusCode;

  async handle(matchData: IMatchPostRequest) {
    const homeClub = await this.getClubByIdModel.handle(matchData.homeTeam);

    const awayClub = await this.getClubByIdModel.handle(matchData.awayTeam);

    if (homeClub instanceof this.ErrorCatcher || awayClub instanceof this.ErrorCatcher) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotAuthorized,
        'There is no team with such id!',
      );
    }

    if (homeClub.id === awayClub.id) {
      return new this.ErrorCatcher(
        this.httpStatusCode.NotAuthorized,
        'It is not possible to create a match with two equal teams',
      );
    }

    const createdMatch = await this.createMatchModel.handle(matchData);

    return createdMatch;
  }
}

export default CreateMatchService;
