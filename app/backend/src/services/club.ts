import { ClubRepository } from '../repositories';
import { IClub } from '../utils/interfaces';

class ClubService {
  public static async findAll() {
    const clubs: IClub[] = await ClubRepository.findAll();

    return clubs;
  }

  public static async findById(id: IClub['id']) {
    const club: IClub = await ClubRepository.findById(id);

    return club;
  }
}

export default ClubService;
