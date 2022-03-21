import { ClubModel } from '../database/models';
import { IClubsRepository, IClub } from '../interfaces';

export default class ClubsRepository implements IClubsRepository {
  async getAllClubs(): Promise<IClub[]> {
    return (await ClubModel.findAll())
      .map((club) => club.get({ plain: true }));
  }

  async getClubById(id: string): Promise<IClub | null> {
    return (await ClubModel.findByPk(id))?.get({ plain: true });
  }
}
