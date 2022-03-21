import Club from '../database/modelsSequelize/club';
import IMatchReq from '../interfaces/match/IMatchReq';
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
/* import IMatchRes from '../interfaces/match/IMatchRes'; */
import Match from '../database/modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  private clubEntity = Club;

  async getMatchsByProgress(progressData: boolean | undefined = undefined) {
    let matchs;

    if (progressData === undefined) {
      matchs = await this.matchEntity.findAll({
        include: [
          { model: this.clubEntity, as: 'homeClub' },
          { model: this.clubEntity, as: 'awayClub' },
        ],
      });
    } else {
      matchs = await this.matchEntity.findAll({
        where: { progressData },
        include: [
          { model: this.clubEntity, as: 'homeClub' },
          { model: this.clubEntity, as: 'awayClub' },
        ],
      });
    }

    return matchs;
  }

  async saveMatchInProgress(match: IMatchReq) {
    const verifyExistTeam1 = await this.clubEntity.findByPk(match.homeTeam);
    const verifyExistTeam2 = await this.clubEntity.findByPk(match.awayTeam);
    if (verifyExistTeam1 === null || verifyExistTeam2 === null) return null;
    if (verifyExistTeam1 === verifyExistTeam2) return null;
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
