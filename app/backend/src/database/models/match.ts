import Match from '../modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  async getMatchsByProgress(requestInprogress: string) {
    const matchs = await this.matchEntity.findAll({ where: { requestInprogress } });
    if (!matchs || !matchs.length) return null;
    return matchs;
  }
}

export default MatchModel;
