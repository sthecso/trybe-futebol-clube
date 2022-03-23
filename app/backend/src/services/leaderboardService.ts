import Club from '../database/models/Club';
import Match from '../database/models/Match';

export default class LeaderboardService {
  private clubModel = Club;

  private matchModel = Match;

  public test = ['oi', 2, 3];

  public async getAllHome() {
    const test2 = this.test;
    return test2;
  }
}
