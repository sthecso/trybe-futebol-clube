import { ClubsService } from '../services';

export default class ClubService {
  constructor(
    private clubsService: ClubsService,
  ) {}

  async getAllClubs() {
    return this.clubsService.getAllClubs();
  }

  async getClubById(id: string) {
    return this.clubsService.getClubById(id);
  }
}
