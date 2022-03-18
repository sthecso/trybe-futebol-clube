import { GetLeaderboardsModel } from '../../models/leaderboards';

class GetLeaderboardsService {
  private getLeaderboardsService = new GetLeaderboardsModel();

  async handle() {
    const leaderboards = await this.getLeaderboardsService.handle();

    return leaderboards;
  }
}

export default GetLeaderboardsService;
