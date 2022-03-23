import Club from '../../database/models/Club';
import { IClub } from '../interfaces/IClub';

export default class ClubRepository {
  private clubModel = Club;

  async getAll(): Promise<IClub[]> {
    const result = await this.clubModel.findAll({
      attributes: ['id', ['club_name', 'clubName']],
      raw: true,
    });

    const clubs = result as unknown as IClub[];
    return clubs;
  }

  async getById(id: number): Promise<IClub | false> {
    const result = await this.clubModel.findByPk(id, {
      attributes: ['id', ['club_name', 'clubName']],
      raw: true,
    });

    if (result) {
      const club = result as unknown as IClub;
      return club;
    }
    return false;
  }
}

export const clubRepo = new ClubRepository();

// Return array of plain objects
// https://stackoverflow.com/questions/46380563/get-only-datavalues-from-sequelize-orm
