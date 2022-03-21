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

  async getById(id: number) {
    const club = await this.clubModel.findByPk(id);
    if (!club) {
      return { code: StatusCode.BAD_REQUEST, data: { message: 'Club Not Found' } };
    }
    return { code: StatusCode.OK, data: club };
  }
}

export default ClubService;
