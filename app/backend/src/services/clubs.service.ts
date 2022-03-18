import { ClubsRepository } from '../repositories';

export default class ClubsServices {
  constructor(
    private clubsRepository: typeof ClubsRepository,
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
