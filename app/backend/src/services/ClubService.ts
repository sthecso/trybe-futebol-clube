import IClub from '../interfaces/IClub';
import Club from '../database/models/Club';

class ClubService {
  private ClubModel = Club;

  async getAll() {
    const clubs: IClub[] = await this.ClubModel.findAll();
    return clubs;
  }

  async getById(id: number) {
    const club: IClub | null = await this.ClubModel.findByPk(id);
    return club;
  }
}

export default ClubService;
