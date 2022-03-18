import GetAll from '../services/clubService';

export default class GetAllClubs {
  public static async getClubs() {
    return GetAll.getAll();
  }
}
