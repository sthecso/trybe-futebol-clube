import GetById from '../services/ClubById';

export default class GetOneClub {
  public static async getOneClub(id:number) {
    return GetById.getById(id);
  }
}
