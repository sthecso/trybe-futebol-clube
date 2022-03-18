import db from '../../database/models';

class GetLeaderboardsModel {
  private queryORM = async (query: string) => db.query(query);

  constructor(private queryString: string) {}

  async handle() {
    const [leaderBoards] = await this.queryORM(this.queryString);

    return leaderBoards;
  }
}

export default GetLeaderboardsModel;
