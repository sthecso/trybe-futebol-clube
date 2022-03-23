import GetAllService from '../services/GetAllMatch';

export default class GetAllMatchs {
  public static async getMatch() {
    return GetAllService.getAll();
  }
}
