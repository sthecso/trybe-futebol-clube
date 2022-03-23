import { ClubsRepository } from '../repositories';
import { LeaderboardService } from '../services';

export const leaderboardFactory = () => new LeaderboardService(new ClubsRepository());
