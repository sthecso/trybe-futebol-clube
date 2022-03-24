import GetAllService from '../services/GetAllMatch';

export default class GetAllMatchs {
  public static async getMatch() {
    return GetAllService.getAll();
  }
  public static async getMatchTrue(){
    return GetAllService.getAllTrue();
  }
  public static async getMatchFalse(){
    return GetAllService.getAllFalse();
  }
}
