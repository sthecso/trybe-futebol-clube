/* import IMatchReq from '../interfaces/match/IMatchReq'; */
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
import MatchModel from '../models/match';

class MatchService {
  private modelMatch = new MatchModel();

  constructor() {
    this.getMatchsByProgress = this.getMatchsByProgress.bind(this);
    this.updateResultsMatch = this.updateResultsMatch.bind(this);
  }

  async getMatchsByProgress(progressData: string) {
    let booleanQuery: boolean | undefined;

    if (progressData && progressData === 'false') {
      booleanQuery = false;
    }

    if (progressData && progressData === 'true') {
      booleanQuery = true;
    }

    const allMatches = await this.modelMatch.getMatchsByProgress(booleanQuery);

    return allMatches;
  }

  async updateResultsMatch(id: number, goalsMatch: IUpdateGoalsReq) {
    /* const saveProgressMatch = */ await this.modelMatch.updateResultsMatch(id, goalsMatch);
    /* return saveProgressMatch; */
  }
}

export default MatchService;
