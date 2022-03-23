import { ClubModel } from '../../database/models';
import { IClub } from '../interfaces';

export default class ClubRepository {
  private _clubModel: typeof ClubModel;

  constructor() {
    this._clubModel = ClubModel;
  }

  async getAll(): Promise<IClub[]> {
    return (await this._clubModel.findAll()).map((club) => club.get({ plain: true }));
  }

  async getById(id: string): Promise<IClub | undefined> {
    return (await this._clubModel.findByPk(id))?.get({ plain: true });
  }
}
