import IClub from '../interfaces/IClub';
import Club from '../database/models/Club';

class ClubService {
    private ClubModel = Club;

    async getAll() {
        const clubs: IClub[] = await this.ClubModel.findAll();
        return clubs;
    }
}

export default ClubService;