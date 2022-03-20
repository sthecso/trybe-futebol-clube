import { ClubRepository } from '../../database/repositories';

class GetAllClubsModel {
  private clubRepository = new ClubRepository();

  async handle() {
    const allClubs = await this.clubRepository.findAll();

    return allClubs;
  }
}

export default GetAllClubsModel;
