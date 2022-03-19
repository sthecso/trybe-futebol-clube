import IMatchReq from '../interfaces/match/IMatchReq';
/* import IMatchRes from '../interfaces/match/IMatchRes'; */
import Match from '../modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  async getMatchsByProgress(requestInprogress: boolean) {
    const matchs = await this.matchEntity.findAll({ where: { inProgress: requestInprogress } });
    if (!matchs || !matchs.length) return null;
    return matchs;
  }

  async saveMatchInProgress(match: IMatchReq) {
    const saveProgressMatch = await this.matchEntity.create(match);
    return saveProgressMatch;
  }
}

export default MatchModel;
