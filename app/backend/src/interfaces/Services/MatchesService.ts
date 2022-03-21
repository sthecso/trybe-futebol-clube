import { IMatch, INewMatch, INewMatchResponse, IScore } from '../Match';

export interface IMatchesService {
  getAllMatches(inProgress: boolean | undefined): Promise<{
    code: number,
    data: IMatch[]
  }>;

  getMatchById(id: string): Promise<{
    code: number;
    data: IMatch;
  } | {
    code: number;
    data: {
      message: string;
    };
  }>;

  saveMatch(data: INewMatch): Promise<{
    code: number;
    data: {
      message: string;
    };
  } | {
    code: number;
    data: INewMatchResponse;
  }>;

  finishMatch(id: string): Promise<{
    code: number;
    data: {
      message: string;
    };
  }>

  updateScore(id: string, newScore: IScore): Promise<{
    code: number;
    data: {
      message: string;
    };
  }>
}
