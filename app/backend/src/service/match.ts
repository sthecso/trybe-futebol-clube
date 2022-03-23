import {
  IMatch,
  INewMatch,
  IScore,
} from '../utils/interfaces';
import { MatchRepository, ClubRepository } from '../utils/repository';

export default class MatchService {
  private _matchRepository: MatchRepository;

  private _clubRepository: ClubRepository;

  constructor() {
    this._matchRepository = new MatchRepository();
    this._clubRepository = new ClubRepository();
  }

  async getAll(inProgress: boolean | undefined = undefined) {
    let matches: IMatch[];

    if (inProgress) {
      matches = await this._matchRepository.getAll();
    } else {
      matches = inProgress
        ? await this._matchRepository.getAllInProgress()
        : await this._matchRepository.getAllFinished();
    }

    return { code: 200, data: matches };
  }

  async getById(id: string) {
    const match = await this._matchRepository.getById(id);

    return match
      ? { code: 200, data: match }
      : { code: 404, data: { message: 'Match not found' } };
  }

  async addMatch(data: INewMatch) {
    const matchTeams = await Promise.all([
      this._clubRepository.getById(data.homeTeam.toString()),
      this._clubRepository.getById(data.awayTeam.toString()),
    ]);

    if (matchTeams.includes(undefined)) {
      return { code: 401, data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this._matchRepository.addMatch(data);

    return { code: 201, data: newMatch };
  }

  async finishMatch(id: string) {
    const status = await this._matchRepository.finishMatch(id);

    return status
      ? { code: 200, data: { message: 'Finished match' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }

  async updateMatchScore(id: string, newScore: IScore) {
    const status = await this._matchRepository.updateMatchScore(id, newScore);

    return status
      ? { code: 200, data: { message: 'Match score updated' } }
      : {
        code: 422,
        data: { message: 'Match already over or does not exist' },
      };
  }
}
