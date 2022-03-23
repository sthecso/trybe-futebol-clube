import Club from '../database/models/Club';
import { IClubStats } from '../utils/interfaces';

class LeaderboardRepository {
  public static async findAll(): Promise<IClubStats[]> {
    const result = await Club.findAll();
    return result as unknown as IClubStats[];
  }
}

export default LeaderboardRepository;
