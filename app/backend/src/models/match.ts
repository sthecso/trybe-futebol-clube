import Club from '../database/modelsSequelize/club';
import IMatchReq from '../interfaces/match/IMatchReq';
import IUpdateGoalsReq from '../interfaces/match/IUpdateGoals';
/* import IMatchRes from '../interfaces/match/IMatchRes'; */
import Match from '../database/modelsSequelize/match';

class MatchModel {
  private matchEntity = Match;

  private clubEntity = Club;

  public async getMatchsByProgress(inProgress: boolean | undefined): Promise<Match[]> {
    if (inProgress === undefined) {
      const result = await this.matchEntity.findAll({
        include: [
          { model: this.clubEntity, as: 'homeClub', attributes: ['clubName'] },
          { model: this.clubEntity, as: 'awayClub', attributes: ['clubName'] },
        ],
      });

      return result;
    }
    const resultWithProgress = await this.matchEntity.findAll({
      where: { inProgress },
      include: [
        { model: this.clubEntity, as: 'homeClub', attributes: ['clubName'] },
        { model: this.clubEntity, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return resultWithProgress;
  }

  async saveMatchInProgress(match: IMatchReq) {
    const homeTeam = await this.clubEntity.findOne({ where: { id: match.homeTeam } });
    const awayTeam = await this.clubEntity.findOne({ where: { id: match.awayTeam } });
    if (!homeTeam || !awayTeam) return null;
    const saveProgressMatch = await this.matchEntity.create(match);

    return saveProgressMatch;
  }

  async updateResultsMatch(id: number, { homeTeamGoals, awayTeamGoals }: IUpdateGoalsReq) {
    const [result] = await this.matchEntity.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id, inProgress: true } },
    );

    if (!result) return null;

    return 'Match updated';
  }

  async finishMatch(id: number) {
    await this.matchEntity.update(
      { inProgress: false },
      { where: { id } },
    );
  }
}

export default MatchModel;
