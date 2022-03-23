import { ClubModel } from '../../database/models';
import { IClub } from '../interfaces';

export default class ClubRepository {
  static async getAll(): Promise<IClub[]> {
    return (await ClubModel.findAll()).map((club) => club.get({ plain: true }));
  }

  static async getById(id: string): Promise<IClub | undefined> {
    return (await ClubModel.findByPk(id))?.get({ plain: true });
  }
}
