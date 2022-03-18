import { GetLeaderboardsModel } from '../../models/leaderboards';

class GetLeaderboardsHomeService {
  private getLeaderboardsHomeModel = new GetLeaderboardsModel();

  async handle() {
    const leaderboards = await this.getLeaderboardsHomeModel.handle();

    return leaderboards;
  }
}

export default GetLeaderboardsHomeService;
