import GetById from '../services/ClubById';

export default class GetOneClub {
  // cria classe GetOneClub para pega getById da classe GetById do service
  public static async getOneClub(id:number) {
    return GetById.getById(id);
  }
}
