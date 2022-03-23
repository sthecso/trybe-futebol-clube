import GetAll from '../services/clubService';

export default class GetAllClubs {
  // usando POO para pegar getAll da classe GetAll se services
  public static async getAllClubs() {
    return GetAll.getAll();
  }
}
