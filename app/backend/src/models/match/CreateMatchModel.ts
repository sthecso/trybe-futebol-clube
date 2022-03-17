import Match from '../../database/models/Matchs';

import { IMatchRequest, IMatchResponse } from '../../interfaces/match';

class CreateMatchModel {
  private matchEntity = Match;

  async handle(
    matchData: IMatchRequest,
  ): Promise<IMatchResponse> {
    const createdMatch = await this.matchEntity.create(matchData);

    return createdMatch;
  }
}

export default CreateMatchModel;
