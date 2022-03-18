import { ClubModel } from '../database/models';

export default class ClubsRepository {
  static async getAllClubs() {
    return (await ClubModel.findAll())
      .map((club) => club.get({ plain: true }));
  }

  static async getClubById(id: string) {
    return (await ClubModel.findByPk(id))?.get({ plain: true });
  }
}
