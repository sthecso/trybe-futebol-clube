import { CreateMatchModel } from '../../models/match';

import { IMatchRequest } from '../../interfaces/match';

class CreateMatchService {
  private createMatchModel = new CreateMatchModel();

  async handle(matchData: IMatchRequest) {
    const createdMatch = await this.createMatchModel.handle(matchData);

    return createdMatch;
  }
}

export default CreateMatchService;
