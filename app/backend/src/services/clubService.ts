import Club from '../database/models/Club';

export default class ClubService {
  private clubModel = Club;

  public async getAll(): Promise<Club[]> {
    const result = await this.clubModel.findAll();

    return result as unknown as Club[];
  }
}
