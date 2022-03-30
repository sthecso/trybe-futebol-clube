import Clubs from '../database/models/Clubs';
// import HttpException from '../utils/HttpException';
import { IClubs } from '../interfaces/IClubs';

class ClubsService {
  private _ClubsModel = Clubs;

  public getAll = async () => {
    const clubs: IClubs[] | null = await this._ClubsModel.findAll();
    return clubs;
  };
}

export default new ClubsService();
