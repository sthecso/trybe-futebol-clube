import IMatchPatchRequest from './IMatchPatchRequest';

interface IMatchPostRequest extends IMatchPatchRequest {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}

export default IMatchPostRequest;
