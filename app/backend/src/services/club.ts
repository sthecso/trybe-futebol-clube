import ClubsModels from '../models/club';

class ClubService {
  private clubModel = new ClubsModels();

  constructor() {
    this.getAllClubs = this.getAllClubs.bind(this);
    this.findOneClub = this.findOneClub.bind(this);
  }

  async getAllClubs() {
    const allClubs = await this.clubModel.getAllClubs();
    return allClubs;
  }

  async findOneClub(id: number) {
    const club = await this.clubModel.findOneClub(id);
    return club;
  }
}

export default ClubService;
