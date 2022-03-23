import {
  IClubRepository,
  IMatch,
  IMatchRepository,
  IMatchService,
  INewMatch,
  IScore,
} from '../utils/interfaces';

export default class MatchService implements IMatchService {
  constructor(
    private matchRepository: IMatchRepository,
    private clubRepository: IClubRepository,
  ) {}

  async getAll(inProgress: boolean | undefined = undefined) {
    let matches: IMatch[];

    if (inProgress) {
      matches = await this.matchRepository.getAll();
    } else {
      matches = inProgress
        ? await this.matchRepository.getAllInProgress()
        : await this.matchRepository.getAllFinished();
    }

    return { code: 200, data: matches };
  }

  async getById(id: string) {
    const match = await this.matchRepository.getById(id);

    return match
      ? { code: 200, data: match }
      : { code: 404, data: { message: 'Match not found' } };
  }

  async addMatch(data: INewMatch) {
    const matchTeams = await Promise.all([
      this.clubRepository.getClubById(data.homeTeam.toString()),
      this.clubRepository.getClubById(data.awayTeam.toString()),
    ]);

    if (matchTeams.includes(undefined)) {
      return { code: 401, data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchRepository.addMatch(data);

    return { code: 201, data: newMatch };
  }

  async finishMatch(id: string) {
    const status = await this.matchRepository.finishMatch(id);

    return status
      ? { code: 200, data: { message: 'Finished match' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }

  async updateMatchScore(id: string, newScore: IScore) {
    const status = await this.matchRepository.updateMatchScore(id, newScore);

    return status
      ? { code: 200, data: { message: 'Match score updated' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }
}
