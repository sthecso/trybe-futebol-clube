import Club from '../database/models/Club';

export default class GetAll {
  // cria classe que pega todos os times
  public static async getAll() {
    // cria constante que vai buscar todos os times
    const clubs = Club.findAll();
    return clubs;
  }
}
