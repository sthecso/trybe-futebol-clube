import Match from '../../database/models/Matchs';

import { IMatchPostRequest, IMatchResponse } from '../../interfaces/match';

class CreateMatchModel {
  private matchEntity = Match;

  async handle(
    matchData: IMatchPostRequest,
  ): Promise<IMatchResponse> {
    const createdMatch = await this.matchEntity.create(matchData);

    return createdMatch;
  }
}

export default CreateMatchModel;
