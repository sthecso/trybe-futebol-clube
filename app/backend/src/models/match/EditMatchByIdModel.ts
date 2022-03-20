import { IMatchPatchRequest } from '../../interfaces/match';

import { MatchRepository } from '../../database/repositories';

class EditMatchByIdModel {
  private matchRepository = new MatchRepository();

  async handle(
    matchData: IMatchPatchRequest,
    id: number,
  ) {
    await this.matchRepository.updateOne(
      matchData,
      { id },
    );
  }
}

export default EditMatchByIdModel;
