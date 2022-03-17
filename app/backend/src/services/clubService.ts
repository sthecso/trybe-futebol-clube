import { IClubDTO } from '../interfaces/IClubDTO';
import Club from '../database/models/Club';

export default class ClubService {
  private clubModel = Club;

  public async getAll(): Promise<IClubDTO[]> {
    const result = await this.clubModel.findAll();

    return result as unknown as IClubDTO[];
  }
}
