import db from '../../database/models';

import { ILeaderboardsResponse } from '../../interfaces/leaderboards';

class GetLeaderboardsModel {
  private queryORM = async (query: string) => db.query(query);

  constructor(private queryString: string) {}

  async handle(): Promise<ILeaderboardsResponse[]> {
    const [leaderBoards] = await this.queryORM(this.queryString) as ILeaderboardsResponse[][];

    return leaderBoards;
  }
}

export default GetLeaderboardsModel;
