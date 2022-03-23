import Club from '../database/models/Club';

export default class GetById {
  // cria classe que vai pega os clubes por id
  public static async getById(id:number) {
    // busca os times por id
    const team = await Club.findByPk(id);
    return team;
  }
}
