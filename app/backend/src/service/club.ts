import { ClubRepository } from '../utils/repository';

export default class ClubsService {
  constructor(
    private clubRepository: typeof ClubRepository,
  ) {}

  async getAll() {
    const clubs = await this.clubRepository.getAll();

    return { code: 200, data: clubs };
  }

  async getById(id: string) {
    const club = await this.clubRepository.getById(id);

    return club
      ? { code: 200, data: club }
      : { code: 404, data: { message: 'Club not found' } };
  }
}
