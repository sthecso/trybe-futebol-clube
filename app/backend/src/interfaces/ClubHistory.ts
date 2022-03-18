import { ILeaderboardMatchGoals } from './LeaderboardMatchGoals';

export interface IClubHistory {
  clubName: string;
  matchs: ILeaderboardMatchGoals[];
}
