import { MatchRepository } from '../../database/repositories';

import { IMatchPostRequest, IMatchResponse } from '../../interfaces/match';

class CreateMatchModel {
  private matchEntity = new MatchRepository();

  async handle(
    matchData: IMatchPostRequest,
  ): Promise<IMatchResponse> {
    const createdMatch = await this.matchEntity.createOne(matchData);

    return createdMatch;
  }
}

export default CreateMatchModel;
