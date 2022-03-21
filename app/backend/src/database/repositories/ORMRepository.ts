import db from '../models';

import { ILeaderboardsResponse } from '../../interfaces/leaderboards';

class ORMRepository {
  private ORM = db;

  async query(queryString: string) {
    const [query] = await this.ORM.query(queryString) as ILeaderboardsResponse[][];

    return query;
  }
}

export default ORMRepository;
