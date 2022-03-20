import { ClubModel } from '../database/models';
import StatusCode from '../enums';

class ClubService {
  private clubModel: typeof ClubModel;

  constructor() {
    this.clubModel = ClubModel;
  }

  async getAll() {
    const clubs = await this.clubModel.findAll();
    return { code: StatusCode.OK, data: clubs };
  }
}

export default ClubService;
