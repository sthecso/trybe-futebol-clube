import {
  INewMatch,
  IScore,
  IClubsRepository,
  IMatchesRepository,
  IMatch,
  IMatchesService,
} from '../interfaces';

export class MatchesService implements IMatchesService {
  constructor(
    private matchesRepository: IMatchesRepository,
    private clubsRepository: IClubsRepository,
  ) {}

  async getAllMatches(inProgress: boolean | undefined = undefined) {
    let matchList: IMatch[];

    if (inProgress === undefined) {
      matchList = await this.matchesRepository.getAllMatches();
    } else {
      matchList = inProgress ? await this.matchesRepository.getAllInProgressMatches()
        : await this.matchesRepository.getAllFinishedMatches();
    }

    return { code: 200, data: matchList };
  }

  async getMatchById(id: string) {
    const match = await this.matchesRepository.getMatchById(id);

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

    const newMatch = await this.matchesRepository.saveMatch(data);

    return { code: 201, data: newMatch };
  }

  async finishMatch(id: string) {
    const status = await this.matchesRepository.finishMatch(id);

    return status ? { code: 200, data: { message: 'Finished match' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }

  async updateScore(id: string, newScore: IScore) {
    const status = await this.matchesRepository.updateScore(id, newScore);

    return status ? { code: 200, data: { message: 'Match score updated' } }
      : { code: 422, data: { message: 'Match already over or does not exist' } };
  }
}
