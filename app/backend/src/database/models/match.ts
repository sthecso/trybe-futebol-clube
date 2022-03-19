import Match from '../modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  async getMatchsByProgress(requestInprogress: boolean) {
    const matchs = await this.matchEntity.findAll({ where: { inProgress: requestInprogress } });
    if (!matchs || !matchs.length) return null;
    return matchs;
  }
}

export default MatchModel;
