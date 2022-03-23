import { Leaderboard } from '../leaderboard';
import StatusCode from '../enums';

class ClubService {
  private leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard();
  }

  async getAll() {
    const clubs = await this.leaderBoard.getAll();
    return { code: StatusCode.OK, data: clubs };
  }
}

export default ClubService;
