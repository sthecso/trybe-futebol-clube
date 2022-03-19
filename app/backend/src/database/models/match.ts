import IMatchReq from '../interfaces/match/IMatchReq';
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
import Club from '../modelsSequelize/club';
/* import IMatchRes from '../interfaces/match/IMatchRes'; */
import Match from '../modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  private clubEntity = Club;

  async getMatchsByProgress(requestInprogress: boolean) {
    const matchs = await this.matchEntity.findAll({ where: { inProgress: requestInprogress } });
    if (!matchs || !matchs.length) return null;
    return matchs;
  }

  async saveMatchInProgress(match: IMatchReq) {
    const verifyExistTeam1 = await this.clubEntity.findByPk(match.homeTeam);
    const verifyExistTeam2 = await this.clubEntity.findByPk(match.awayTeam);
    if (verifyExistTeam1 === null || verifyExistTeam2 === null) return null;
    const saveProgressMatch = await this.matchEntity.create(match);

    return saveProgressMatch;
  }

  async updateResultsMatch(id: number, { homeTeam, awayTeam }: IUpdateGoalsReq) {
    /* const saveProgressMatch = */ await this.matchEntity.update(
      { homeTeam, awayTeam },
      { where: { id } },
    );
    /* return saveProgressMatch; */
  }
}

export default MatchModel;
