import Club from '../database/models/Club';

export default class GetAll {
  public static async getAll() {
    const clubs = Club.findAll();
    return clubs;
  }
}
