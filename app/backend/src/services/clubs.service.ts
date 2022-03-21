import { ClubsRepository } from '../repositories';

export class ClubsService {
  constructor(
    private clubsRepository: ClubsRepository,
  ) {}

  async getAllClubs() {
    const clubsList = await this.clubsRepository.getAllClubs();

    return { code: 200, data: clubsList };
  }

  async getClubById(id: string) {
    const club = await this.clubsRepository.getClubById(id);

    return club ? { code: 200, data: club } : { code: 404, data: { message: 'Club not found' } };
  }
}
