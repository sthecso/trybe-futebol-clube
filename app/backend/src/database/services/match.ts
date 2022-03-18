import MatchModel from '../models/match';

class MatchService {
  private modelMatch = new MatchModel();

  async getMatchsByProgress(progressData: string) {
    const matchs = await this.modelMatch.getMatchsByProgress(progressData);
    return matchs;
  }
}

export default MatchService;
