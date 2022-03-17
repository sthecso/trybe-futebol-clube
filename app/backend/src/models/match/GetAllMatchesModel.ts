import Match from '../../database/models/Matchs';

class GetAllMatchesModel {
  private matchEntity = Match;

  async handle() {
    const allMatches = await this.matchEntity.findAll();

    console.log(allMatches);

    return allMatches;
  }
}

export default GetAllMatchesModel;
