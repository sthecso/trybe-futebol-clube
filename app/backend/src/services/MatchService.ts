import StatusCode from '../enums';
import { ClubModel, MatchModel } from '../database/models';

class MatchService {
  private matchModel: typeof MatchModel;

  constructor() {
    this.matchModel = MatchModel;
  }

  async getAll() {
    const matchs = await this.matchModel.findAll({ include: [
      { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
      { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
    ] });
    return { code: StatusCode.OK, data: matchs };
  }

  async getInProgress(inProgress: boolean) {
    const matchs = await this.matchModel.findAll({ include: [
      { model: ClubModel, as: 'homeClub', attributes: ['clubName'] },
      { model: ClubModel, as: 'awayClub', attributes: ['clubName'] },
    ],
    where: { inProgress } });
    return { code: StatusCode.OK, data: matchs };
  }
}

export default MatchService;
