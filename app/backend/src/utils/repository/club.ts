import { ClubModel } from '../../database/models';

export default class ClubRepository {
  static async getAll() {
    return (await ClubModel.findAll()).map((club) => club.get({ plain: true }));
  }

  static async getById(id: string) {
    return (await ClubModel.findByPk(id))?.get({ plain: true });
  }
}
