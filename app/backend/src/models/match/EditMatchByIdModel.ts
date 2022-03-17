import { IMatchPatchRequest } from '../../interfaces/match';

import Match from '../../database/models/Matchs';

class EditMatchByIdModel {
  private matchEntity = Match;

  async handle(
    matchData: IMatchPatchRequest,
    id: number,
  ) {
    await this.matchEntity.update(
      matchData,
      { where: { id } },
    );
  }
}

export default EditMatchByIdModel;
