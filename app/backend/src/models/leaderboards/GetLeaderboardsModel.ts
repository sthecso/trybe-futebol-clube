import { ORMRepository } from '../../database/repositories';

import { ILeaderboardsResponse } from '../../interfaces/leaderboards';

class GetLeaderboardsModel {
  private ORM = new ORMRepository();

  constructor(private queryString: string) {}

  async handle(): Promise<ILeaderboardsResponse[]> {
    const leaderBoards = await this.ORM.query(this.queryString);

    return leaderBoards;
  }
}

export default GetLeaderboardsModel;
