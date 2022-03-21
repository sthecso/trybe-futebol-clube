import {
  INewMatch,
  IScore,
  IClubsRepository,
  IMatchsRepository,
  IMatch,
  IMatchsService,
} from '../interfaces';

export class MatchsService implements IMatchsService {
  constructor(
    private matchsRepository: IMatchsRepository,
    private clubsRepository: IClubsRepository,
  ) {}

  async getAllMatchs(inProgress: boolean | undefined = undefined) {
    let matchList: IMatch[];

    if (inProgress === undefined) {
      matchList = await this.matchsRepository.getAllMatches();
    } else {
      matchList = inProgress ? await this.matchsRepository.getAllInProgressMatches()
        : await this.matchsRepository.getAllFinishedMatches();
    }

    return { code: 200, data: matchList };
  }

  async getMatchById(id: string) {
    const match = await this.matchsRepository.getMatchById(id);

    return match ? { code: 200, data: match } : { code: 404, data: { message: 'Match not found' } };
  }

  async saveMatch(data: INewMatch) {
    const teams = await Promise.all([
      this.clubsRepository.getClubById(data.homeTeam.toString()),
      this.clubsRepository.getClubById(data.awayTeam.toString()),
    ]);

    if (teams.includes(undefined)) {
      return { code: 401, data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchsRepository.saveMatch(data);

    return { code: 201, data: newMatch };
  }

  async finishMatch(id: string) {
    const status = await this.matchsRepository.finishMatch(id);

    return status ? { code: 200, data: { message: 'Finished match' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }

  async updateScore(id: string, newScore: IScore) {
    const status = await this.matchsRepository.updateScore(id, newScore);

    return status ? { code: 200, data: { message: 'Match score updated' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }
}
