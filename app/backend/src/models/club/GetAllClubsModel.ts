import Club from '../../database/models/Club';

class GetAllClubsModel {
  private clubEntity = Club;

  async handle() {
    const allClubs = await this.clubEntity.findAll();

    return allClubs;
  }
}

export default GetAllClubsModel;
