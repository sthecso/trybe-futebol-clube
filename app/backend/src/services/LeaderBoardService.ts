import { Leaderboard } from '../leaderboard';
import StatusCode from '../enums';

class ClubService {
  private leaderBoard: Leaderboard;

  constructor() {
    this.leaderBoard = new Leaderboard();
  }

  async getAll() {
    const clubs = await this.leaderBoard.getBoard();
    return { code: StatusCode.OK, data: clubs };
  }

  async getHome() {
    const clubs = await this.leaderBoard.getBoard('home');
    return { code: StatusCode.OK, data: clubs };
  }

  async getAway() {
    const clubs = await this.leaderBoard.getBoard('away');
    return { code: StatusCode.OK, data: clubs };
  }
}

export default ClubService;
