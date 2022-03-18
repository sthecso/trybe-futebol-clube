import { GetLeaderboardsModel } from '../../models/leaderboards';

import { leaderboardsHomeQuery } from '../../utils';

class GetLeaderboardsHomeService {
  private getLeaderboardsModel = new GetLeaderboardsModel(leaderboardsHomeQuery);

  async handle() {
    const leaderboards = await this.getLeaderboardsModel.handle();

    return leaderboards;
  }
}

export default GetLeaderboardsHomeService;
