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
}
