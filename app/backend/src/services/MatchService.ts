import StatusCode from '../enums';
import { ClubModel, MatchModel } from '../database/models';
import { IMatch, IMatchGoals } from '../interfaces';

class MatchService {
  private matchModel: typeof MatchModel;

  constructor() {
    this.matchModel = MatchModel;
  }

  async getAll() {
    const matchs = await this.matchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return { code: StatusCode.OK, data: matchs };
  }

  async getInProgress(inProgress: boolean) {
    const matchs = await this.matchModel.findAll({
      include: [
        { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
        { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
      ],
      where: { inProgress },
    });
    return { code: StatusCode.OK, data: matchs };
  }

  async postMatch(match: IMatch) {
    const { id } = await this.matchModel.create(match);
    const data = {
      id,
      ...match,
    };
    return { code: StatusCode.CREATED, data };
  }

  async editMatch(matchGoals: IMatchGoals) {
    const { id, homeTeamGoals, awayTeamGoals } = matchGoals;
    await this.matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { code: StatusCode.NO_CONTENT, data: 'Updated' };
  }

  async finishMatch(id: number) {
    await this.matchModel.update(
      { inProgress: false },
      {
        where: { id },
      },
    );
    return { code: StatusCode.NO_CONTENT, data: 'Updated' };
  }
}

export default MatchService;
