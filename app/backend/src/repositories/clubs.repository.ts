import { ClubModel } from '../database/models';
import { IClubsRepository, IClub } from '../interfaces';

export class ClubsRepository implements IClubsRepository {
  async getAllClubs(): Promise<IClub[]> {
    return (await ClubModel.findAll())
      .map((club) => club.get({ plain: true }));
  }

  async getClubById(id: string): Promise<IClub | undefined> {
    return (await ClubModel.findByPk(id))
      ?.get({ plain: true });
  }
}
