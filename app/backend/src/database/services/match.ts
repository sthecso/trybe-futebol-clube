import IMatchReq from '../interfaces/match/IMatchReq';
import MatchModel from '../models/match';

class MatchService {
  private modelMatch = new MatchModel();

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
  }

  async getMatchsByProgress(progressData: string) {
    if (progressData === 'false') {
      const data: boolean | undefined = false;
      const falseMatch = await this.modelMatch.getMatchsByProgress(data);
      return falseMatch;
    }
    const data: boolean | undefined = false;
    const trueMatchs = await this.modelMatch.getMatchsByProgress(data);
    return trueMatchs;
  }

  async saveMatchInProgress(match: IMatchReq) {
    const saveProgressMatch = await this.modelMatch.saveMatchInProgress(match);
    return saveProgressMatch;
  }
}

export default MatchService;
