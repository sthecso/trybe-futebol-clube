import { ClubModel } from '../database/models';

export default class ClubsServices {
  private clubModel: typeof ClubModel;

  constructor() {
    this.clubModel = ClubModel;
  }

  async findAll() {
    const clubsList = await this.clubModel.findAll();

    return { code: 200, data: clubsList };
  }

  async findById(id: string) {
    const club = await this.clubModel.findByPk(id);

    return club ? { code: 200, data: club } : { code: 404, data: { message: 'Club not found' } };
  }
}
