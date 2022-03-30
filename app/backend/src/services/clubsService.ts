import HttpException from '../utils/HttpException';
import Clubs from '../database/models/Clubs';
import { IClubs } from '../interfaces/IClubs';

class ClubsService {
  private _ClubsModel = Clubs;

  public getAll = async () => {
    const clubs: IClubs[] | null = await this._ClubsModel.findAll();
    return clubs;
  };

  public getById = async (id: string) => {
    const club: IClubs | null = await this._ClubsModel.findByPk(id);
    if (!club || club === null) {
      throw new HttpException(404, 'Club not found');
    }
    return club;
  };
}

export default new ClubsService();
