import Club from '../database/models/Club';

export default class ClubsServices {
  async findOneClub(id: number): Promise<any> {
    const clubs = await Club.findOne({
      where: { id },
    });
    return clubs;
  }

  async findAllClubs(): Promise<any> {
    const clubs = await Club.findAll();
    return clubs;
  }
}
