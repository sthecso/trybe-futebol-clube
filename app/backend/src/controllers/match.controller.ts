import MatchsServices from "../services/match.service";

export default class MatchController {
  private matchService = new MatchsServices();

  public async allMatchs(): Promise<any> {
    const result = await this.matchService.allMatchs();
    return result
  }

  public async findByInProgress(inProgress: string): Promise<any> {
    const result = await this.matchService.findOneByInProgress(inProgress);
    return result
  }

  public async create(data: object): Promise<any> {
    const result = await this.matchService.create(data);
    return result
  }

  public async findById(id: number): Promise<any> {
    const result = await this.matchService.findById(id);
    return result;
  }

  public async editMatch(id: number): Promise<any> {
    const result = await this.matchService.editMatch(id)
    return result;
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<any> {
    const result = await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals)
    return result;
  }
}
