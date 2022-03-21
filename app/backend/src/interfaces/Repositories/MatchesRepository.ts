import { IMatch, INewMatch, INewMatchResponse, IScore } from '../Match';

export interface IMatchesRepository {
  getAllInProgressMatches(): Promise<IMatch[]>;
  getAllFinishedMatches(): Promise<IMatch[]>;
  getAllMatches(): Promise<IMatch[]>;
  getMatchById(id: string): Promise<IMatch>;
  saveMatch(data: INewMatch): Promise<INewMatchResponse>;
  finishMatch(id: string): Promise<number>;
  updateScore(id: string, newScore: IScore): Promise<number>;
}
