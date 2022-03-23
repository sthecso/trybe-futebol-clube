import { IClub } from '../interfaces/IClub';
import { clubRepo } from '../repositories/club.repository';

export default class ClubService {
  static async getAll(): Promise<IClub[]> {
    const clubs = await clubRepo.getAll();
    return clubs;
  }

  static async getById(id: number): Promise<IClub | false> {
    const club = await clubRepo.getById(id);

    if (club) {
      return club;
    }
    return false;
  }
}

export const clubService = ClubService;
