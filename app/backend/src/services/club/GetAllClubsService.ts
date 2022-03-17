import { GetAllClubsModel } from '../../models/club';

class GetAllClubsService {
  private getAllClubsModel = new GetAllClubsModel();

  async handle() {
    const allClubs = await this.getAllClubsModel.handle();

    return allClubs;
  }
}

export default GetAllClubsService;
